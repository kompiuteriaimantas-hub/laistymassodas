import express from "express";
import db from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { ip } = req.body;

  if (!ip) return res.status(400).json({ error: "No IP" });

  await db.query(
    "UPDATE system SET esp_ip = $1 WHERE id = 1",
    [ip]
  );

  res.json({ status: "ESP registered", ip });
});

export default router;
