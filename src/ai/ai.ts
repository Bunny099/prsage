import { GoogleGenAI } from "@google/genai";
import "dotenv/config.js";
const gemAi = new GoogleGenAI({ apiKey: process.env.GEMINI_API! });

export const prReview = async (data: Array<Object>) => {
  let response = await gemAi.models.generateContent({
    model: "gemini-3.1-flash-lite-preview",
    contents: `
        You are a senior software engineer performing a pull request review.

        Review the following pull request changes and provide concise feedback.
            Focus on:
            - bugs
            - security issues
            - performance concerns
            - code quality
            - edge cases

       Return the result strictly in this JSON format:

        {
        "summary": "The pull request introduces JWT authentication and GitHub App integration. The overall structure is good but some error handling improvements are needed.",
         "issues": [
             "Environment variables are used without validation which may cause runtime errors.",
             "Error handling for GitHub API requests is incomplete."
         ],
        "suggestions": [
             "Add validation for required environment variables before use.",
             "Consider centralizing GitHub API calls into a dedicated service layer."
        ]
        }

          

        --------------IMPORTANT INSTRUCTIONS STRICTLY TO FOLLOW-------------------------
         1: Do not include any text outside the JSON.
         2: If no issues are found → return No issues!.
         3: If no suggestion needed than return ready to merge!
         4: Always return the summary of PR. 
         5: Summary should be minimum 1 line and maximum 5 lines. For Issues complete issues with min 1 line and maximum 4 line issues which also include all issuues and keep it try to short and simple without overcoplicated anything And if there is no issue than defualt line for issue "No issues!". For suggestions 1 suggetions min and max 3 and no suggestion needed than default line "Ready to merge!".
         6: For suggestions and issues keep one line end with full stop (.) not in between full stop and comma one line - line will ended when full stop (.) given at the end and separate that one line to second line with comma (,) -  in one continue  line comma (,) will be NOT allowed. so structure look like this Example of issue and suggestions both counts: issues or suggestions:[ "First line start and end here." , "Second line starts and end here." , "Third line starts and end here."] 

        Code changes:
        ${JSON.stringify(data)}`,
  });
  return response;
};
