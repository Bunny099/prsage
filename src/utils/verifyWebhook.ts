import { Webhooks } from "@octokit/webhooks";
import type { NextFunction, Request, Response } from "express";
import "dotenv/config.js"
let webhookSecret = process.env.WEBHOOK_SEC!;
let webhook = new Webhooks({ secret: webhookSecret });

export const verifyWebhook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let signatureHeader = req.headers["x-hub-signature-256"];

  if (!signatureHeader) {
    return res.status(404).json({ message: "Signature not found!" });
  }
  const signature =
    typeof signatureHeader === "string" ? signatureHeader : signatureHeader[0]!;

  if (process.env.NODE_ENV === "production") {
    let isValid = await webhook.verify(req.rawBody, signature);
    if (!isValid) {
      return res.status(401).json({ message: "Inavlid webhook signature" });
    }
  }
  next()
};
