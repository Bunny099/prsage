# Privacy Policy

PRsage is a GitHub App that reviews pull requests and provides automated feedback.

## Information We Process

PRsage processes limited data required to function:

- Pull request metadata (repository name, PR number, file changes)
- Code diffs (patch data) for analysis
- Generated review results for iteration tracking

PRsage does not access full repository data beyond what is required for pull request reviews.

## How Data Is Used

The data is used only to:

- Analyze pull request changes
- Generate review feedback
- Maintain iteration history for improved reviews

## Third-Party Services

PRsage uses the following third-party services:

- Google Gemini API (for code analysis)
- Hosting infrastructure (Render)
- PostgreSQL database (for storing review history)

Code snippets may be sent to the AI provider strictly for analysis purposes.

## Data Storage

PRsage stores minimal data:

- Review summaries
- Patch metadata
- Iteration history

No sensitive credentials or personal user data are stored.

## Data Retention

Stored data is limited to pull request review history and can be removed by uninstalling the app or clearing the database.

## Security

- All communication is over HTTPS
- Webhook requests are verified using signatures
- Secrets and keys are stored securely via environment variables

## Changes to This Policy

This policy may be updated as the product evolves.

## Contact

For questions, please open an issue on the repository:
https://github.com/Bunny099/prsage