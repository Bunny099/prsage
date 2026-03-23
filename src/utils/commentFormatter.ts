export interface CommentDataInput {
  summary: string;
  issues: string[];
  suggestions: string[];
}

export const commentFormatter = (data: CommentDataInput) => {
  let formattedIssues = data.issues.map((is) =>`- ${is}`).join("\n");
  let formattedSuggestions = data.suggestions.map((s) =>`- ${s}`).join("\n");
  let comment = `
<!-- PRSAGE -->  
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
