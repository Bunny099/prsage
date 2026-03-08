import type { Octokit } from "octokit";

interface GetFilesInput {
  octo: Octokit;
  owner: string;
  repo: string;
  pull_number: number;
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
