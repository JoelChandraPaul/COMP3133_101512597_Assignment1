require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");

async function start() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  await connectDB();

  app.get("/", (req, res) => res.json({ status: "ok" }));

  const port = process.env.PORT || 4000;
  app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
