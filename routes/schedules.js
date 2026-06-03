import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const result = await db.query("SELECT * FROM schedules ORDER BY id ASC");
  res.json(result.rows);
});

router.post("/", async (req, res) => {
  const { zone, start_time, duration_seconds } = req.body;

  await db.query(
    "INSERT INTO schedules (zone, start_time, duration_seconds) VALUES ($1, $2, $3)",
    [zone, start_time, duration_seconds]
  );

  res.json({ status: "OK" });
});

export default router;
