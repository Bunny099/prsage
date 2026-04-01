import express, { type Request, type Response ,type Express } from "express";
import SmeeClient from "smee-client";
import "dotenv/config.js";
import { webRouter } from "./routes/webhook.routes.js";
import cors from "cors"

let development = process.env.NODE_ENV === "development";
if(development){
  let smeeUrl = process.env.SMEE_URL;
  if(!smeeUrl){
    throw new Error("Smee source not found!")
  }
const smee = new SmeeClient({
  source: smeeUrl,
  target: "http://localhost:3000/webhook/events",
  logger: console,
});
await smee.start();
}

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