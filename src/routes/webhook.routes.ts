
import { Router } from "express";
import { verifyWebhook } from "../utils/verifyWebhook.js";
import { webhookController } from "../controllers/webhook.controller.js";
export const webRouter:Router = Router();

webRouter.post("/events",verifyWebhook,webhookController)