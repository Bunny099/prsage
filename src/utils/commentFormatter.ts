export interface CommentDataInput {
  summary: string;
  issues: string[];
  suggestions: string[];
}
export interface IterationCommentDataInput{
   summary: string;
   solvedIssues:string[]
  currentIssues: string[];
  suggestions: string[];
}

export const commentFormatter = (data: CommentDataInput,id:number) => {
  let formattedIssues = data.issues.map((is) =>`- ${is}`).join("\n");
  let formattedSuggestions = data.suggestions.map((s) =>`- ${s}`).join("\n");
  let comment = `
<!-- PRSAGE Iteration:${id}-->  
🤖 **PRsage AI Review**

### Summary
${data.summary}

---

## Issues
${formattedIssues}

---

## Suggestions
${formattedSuggestions}
`.trim();
return comment;
};

export const iterationCommentFormatter= (data:IterationCommentDataInput,id:number)=>{
  let formatterSolvedIssues = data.solvedIssues.map((solIs)=>`- ${solIs}`).join("\n");
  let formattedIssues = data.currentIssues.map((is)=>`- ${is}`).join("\n");
  let formattedSuggestions = data.suggestions.map((s)=>`- ${s}`).join("\n");
  let comment = `
<!-- PRSAGE Iteration:${id}-->  
🤖 **PRsage AI Review**

### Summary
${data.summary}

---

### Solved Issues
${formatterSolvedIssues}

---

## Current Issues
${formattedIssues}

---

## Suggestions
${formattedSuggestions}
`.trim();
return comment;
}