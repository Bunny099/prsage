import { jwtToken } from "../utils/jwt.js";
import { getInstallationToken } from "../utils/installationToken.js";
import {
  fetchComment,
  getPrFiles,
  updateComment,
} from "../github/pullRequest.js";
import { prReview } from "../ai/ai.js";
import { commentFormatter } from "../utils/commentFormatter.js";
import { postComment } from "../github/pullRequest.js";
import { octoClient } from "../utils/octoClient.js";
import type {
  ExtractedCommentInput,
  ExtractedFileInput,
  ReviewPullRequestInput,
} from "../utils/types.js";

export const reviewPullRequest = async ({
  repo,
  id,
  owner,
  pull_number,
}: ReviewPullRequestInput) => {
  try {
    const jwttoken = await jwtToken();

    let installation = await getInstallationToken(jwttoken, id);
    const token = installation.token;
    const octo = await octoClient(token);
    let prFiles = await getPrFiles({ octo, owner, repo, pull_number });

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

    let geminiResponse = await prReview(extractedFileData);
    if (!geminiResponse.text) {
      throw new Error("AI Failer!");
    }
    let formatedResponse = JSON.parse(geminiResponse.text);

    let body = commentFormatter(formatedResponse);

    let comments = await fetchComment({
      octo,
      owner,
      pull_number,
      repo,
    });

    let matchedComment = comments.data
      .reverse()
      .find((c: any) => c.body.includes("PRSAGE"));

    if (matchedComment) {
      // action synchronize
      let commentId = matchedComment.id;
      let commentUpdate = await updateComment({
        octo,
        body,
        repo,
        commentId,
        owner,
      });
    } else {
      //action opened
      let newComment = await postComment({
        octo,
        owner,
        pull_number,
        body,
        repo,
      });
    }
  } catch (e: any) {
    throw new Error("Error while reviewing PR!");
  }
};
