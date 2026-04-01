import { type Request, type Response } from "express";
import { reviewPullRequest } from "../services/reviewPullRequest.js";

export const webhookController = async (req: Request, res: Response) => {
  try {
    const action = req.body.action;
    const id = req.body.installation.id;
    const repo = req.body.repository.name;
    const owner = req.body.repository.owner.login;
    const pull_number = req.body.pull_request.number;
    const prId = req.body.pull_request.id;

    if (!id) {
      return res.status(400).json({ message: "Id not found!" });
    }
   
    let response = await reviewPullRequest({ action,id, repo, owner, pull_number,prId });
    res.status(200).json({ response, message: "Success!" });
  
  } catch (e: any) {
    return res.status(500).json({ message: e.message || "Server error!" });
  }
};
