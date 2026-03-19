import { type Request, type Response } from "express";
import { reviewPullRequest } from "../services/reviewPullRequest.js";

export const webhookController = async (req: Request, res: Response) => {
  try {
    const action = req.body.action;
    const id = req.body.installation.id;
    const repo = req.body.repository.name;
    const owner = req.body.repository.owner.login;
    const pull_number = req.body.pull_request.number;
    if (!id) {
      return res.status(400).json({ message: "Id not found!" });
    }
    if (action === "opened" || action === "synchronize") {
      let response = await reviewPullRequest({ id, repo, owner, pull_number });
      res.status(200).json({ response, message: "Success!" });
    }else{
        return res.status(200).json({message:"Succes!"})
    }
  } catch (e: any) {
    return res.status(500).json({ message: e.message || "Server error!" });
  }
};
