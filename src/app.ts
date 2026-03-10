import express, { type Request, type Response ,type Express } from "express";
import SmeeClient from "smee-client";
import "dotenv/config.js";
import { webRouter } from "./routes/webhook.routes.js";
import cors from "cors"

const smee = new SmeeClient({
  source: "https://smee.io/dEEz9njw0Ulzk3k",
  target: "http://localhost:3000/webhook/events",
  logger: console,
});

await smee.start();
const app:Express = express();

app.use(cors())
app.use(
  express.json({
    verify: (req: Request, res: Response, buf) => {
      req.rawBody = buf.toString();
    },
  }),
);

app.use("/webhook",webRouter)
export default app;