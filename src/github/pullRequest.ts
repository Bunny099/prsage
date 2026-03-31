import type { Octokit } from "octokit";
import { octoClient } from "../utils/octoClient.js";
interface GetFilesInput {
  octo: Octokit,
  owner: string,
  repo: string,
  pull_number: number,
}

interface PostCommentInput{
  
   octo: Octokit,
  owner: string,
  repo: string,
  pull_number: number,
  body: string
}
interface UpdateCommentInput{
  octo:Octokit,
  repo:string,
  owner:string,
  commentId:number,
  body:string
}

interface FetchCommentInput{
octo: Octokit,
  owner: string,
  repo: string,
  pull_number: number,
}
export const getPrFiles = async ({
  octo,
  owner,
  repo,
  pull_number,
}: GetFilesInput) => {
  try {
    const response = await octo.rest.pulls.listFiles({
      owner,
      repo,
      pull_number,
    });
    
    return response;
  } catch (e) {
    throw new Error("Error while fetching pr files!");
  }
};


export const postComment = async({octo,owner,repo,pull_number,body}:PostCommentInput)=>{
  try{
  
  const response =await octo.rest.issues.createComment({owner,repo,body,issue_number:pull_number})
  return response;
  }catch(e){
    throw new Error("Error while posting a comment")
  }
}

export const fetchComment = async({octo,owner,repo,pull_number}:FetchCommentInput)=>{
    try{
      const response = await octo.rest.issues.listComments({issue_number:pull_number,owner,repo});
      return response;
    }catch(e){
      throw new Error("Failed to list comments!")
    }
}


export const updateComment = async({octo,owner,repo,commentId,body}:UpdateCommentInput)=>{
  try{
    const response = await octo.rest.issues.updateComment({owner,repo,body,comment_id:commentId});
    return response;
  }catch(e){
    throw new Error("Failed to update comment!")
  }
}

