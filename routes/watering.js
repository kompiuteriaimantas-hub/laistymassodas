import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const result = await db.query("SELECT * FROM watering_log ORDER BY id DESC LIMIT 50");
  res.json(result.rows);
});

router.post("/", async (req, res) => {
  const { zone, action, duration_seconds } = req.body;

  await db.query(
    "INSERT INTO watering_log (zone, action, duration_seconds) VALUES ($1, $2, $3)",
    [zone, action, duration_seconds]
  );

  res.json({ status: "OK" });
});

export default router;
