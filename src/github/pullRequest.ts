import type { Octokit } from "octokit";
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