import express = require("express");
import cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/api/metrics", (_req, res) => {
  res.json({
    cpu: 25,
    memory: 48,
    disk: 71,
  });
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});