export interface ExtractedFileInput {
  file: string;
  patch: string;
}

export interface ExtractedCommentInput {
  data: [{ id: number; body: string }];
}
type actionType = "opened" | "synchronize"
export interface ReviewPullRequestInput{
    id:number,
    repo:string,
    owner:string,
    pull_number:number,
    prId:number,
    action: actionType
}