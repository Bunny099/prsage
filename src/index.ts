import express from "express";

import SmeeClient from "smee-client";

const app = express();
app.use(express.json());
const smee = new SmeeClient({
  source: "",
  target: "http://localhost:3000/events",
  logger: console,
});

await smee.start();

app.post("/events",async (req, res) => {
  try {
    const data = req.body;
    const dataStr = JSON.stringify(data);
    console.log(dataStr)
    res.status(200).json({ dataStr, message: "payload received" });
  } catch (e) {
    res.status(500).json({ message: "server error!" });
  }
});
app.listen(3000, () => console.log("Port is running on 3000!"));
