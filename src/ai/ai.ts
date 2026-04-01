import { GoogleGenAI } from "@google/genai";
import "dotenv/config.js";
const genAi = new GoogleGenAI({ apiKey: process.env.GEMINI_API! });

export const firstPrReview = async (data: Array<Object>) => {
  let response = await genAi.models.generateContent({
    model: "gemini-3.1-flash-lite-preview",
    contents: `
       You are a senior software engineer reviewing a pull request.

      Analyze the provided code changes and give concise, high-quality feedback.

      Focus only on meaningful issues:
      - bugs
      - security risks
      - performance concerns
      - code quality problems
      - important edge cases

      Avoid trivial or stylistic comments unless they impact correctness or maintainability.

      Return strictly valid JSON in the following format:

      {
        "summary": "Short overview of the PR (1-4 lines).",
        "issues": ["Issue 1.", "Issue 2."],
        "suggestions": ["Suggestion 1.", "Suggestion 2."]
      }

      Rules:
      - Do not include any text outside JSON.
      - Keep each issue/suggestion as a single clear sentence.
      - If no issues, return: ["No issues."]
      - If no suggestions, return: ["Ready to merge."]

      Code changes:

      ${JSON.stringify(data)}`,
  });
  return response;
};
// @ts-ignore
export const updatedPrReview = async ({ oldFiles, prFiles, oldComment }) => {
  let newFiles = prFiles;
  const response = await genAi.models.generateContent({
    model: "gemini-3.1-flash-lite-preview",
    contents: `
    You are a senior software engineer reviewing an updated pull request.

      You are given:
      - previous code changes
      - previous review feedback
      - current updated code

      Your job:
      - identify what issues have been resolved
      - identify remaining or new issues
      - evaluate if the PR quality has improved

      Focus only on meaningful changes. Avoid repeating unchanged feedback.

      Return strictly valid JSON in this format:

      {
        "summary": "Short overview of the current state of the PR.",
        "solvedIssues": ["Resolved issue 1."],
        "currentIssues": ["Remaining issue 1."],
        "suggestions": ["Suggestion 1."]
      }

      Rules:
      - Do not include any text outside JSON.
      - Keep each item concise and clear.
      - If no solved issues: ["No issues resolved."]
      - If no current issues: ["No issues."]
      - If no suggestions: ["Ready to merge."]


      Previous files:
      ${oldFiles}

      Previous review:
      ${oldComment}

      Current changes:
      ${JSON.stringify(prFiles)}

  `,
  });
  return response;
};
