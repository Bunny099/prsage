import { jwtToken } from "../utils/jwt.js";
import { getInstallationToken } from "../utils/installationToken.js";
import { getPrFiles, postComment } from "../github/pullRequest.js";
import { firstPrReview, updatedPrReview } from "../ai/ai.js";
import { commentFormatter, iterationCommentFormatter } from "../utils/commentFormatter.js";
import { octoClient } from "../utils/octoClient.js";
import type { ExtractedFileInput, ReviewPullRequestInput } from "../utils/types.js";
import { dbClient } from "../lib/db.js";

export const reviewPullRequest = async ({
  repo,
  id,
  owner,
  pull_number,
  prId,
  action,
}: ReviewPullRequestInput) => {
  try {
    const jwttoken = await jwtToken();
    let installation = await getInstallationToken(jwttoken, id);
    const token = installation.token;
    const octo = await octoClient(token);
    let prFiles = await getPrFiles({ octo, owner, repo, pull_number });

    if (!prFiles) {
      throw new Error("Failed to patch pr files!");
    }

    let extractedFileData: ExtractedFileInput[] = [];
    prFiles.data.forEach((a) => {
      if (!a.patch) {
        return;
      } else {
        extractedFileData.push({ file: a.filename, patch: a.patch });
      }
    });

    if (extractedFileData.length === 0) {
      return "No patches!";
    }

    if (action === "opened") {
      let geminiResponse = await firstPrReview(extractedFileData);
      if (!geminiResponse.text) {
        throw new Error("AI Failer!");
      }
      let formatedResponse = JSON.parse(geminiResponse.text);
      let body = commentFormatter(formatedResponse, 1);
      await dbClient.data.create({
        data: {
          patchFiles: JSON.stringify(extractedFileData),
          reviews: JSON.stringify(formatedResponse),
          prId,
          iteration: 1,
        },
      });
      await postComment({ octo, owner, repo, body, pull_number });
    }
    
    if (action === "synchronize") {
      const comments = await dbClient.data.findMany({
        where: { prId },
        orderBy: { createdAt: "desc" },
      });
      let lastComment = comments.at(0);
      let id = lastComment?.iteration;
      if (!id) {
        throw new Error("Id not found!");
      }
      let geminiResponse = await updatedPrReview({
        oldComment: lastComment?.reviews,
        oldFiles: lastComment?.patchFiles,
        prFiles,
      });

      if (!geminiResponse.text) {
        throw new Error("AI Failer!");
      }

      let formatedResponse = JSON.parse(geminiResponse.text);
      if (!formatedResponse) {
        throw new Error("Gemini service error!");
      }
      let body = iterationCommentFormatter(formatedResponse, id + 1);
      await dbClient.data.create({
        data: {
          prId,
          reviews: JSON.stringify(formatedResponse),
          patchFiles: JSON.stringify(extractedFileData),
          iteration: id + 1,
        },
      });
      await postComment({ octo, owner, repo, pull_number, body });
    }
  } catch (e: any) {
    console.error(e);
    throw new Error("Error while reviewing PR!");
  }
};
