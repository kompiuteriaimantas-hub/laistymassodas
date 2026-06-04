import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const result = await db.query(
    "SELECT * FROM sensors ORDER BY id DESC LIMIT 20"
  );
  res.json(result.rows);
});

router.post("/", async (req, res) => {
  const { zone, moisture, temperature, pressure } = req.body;

  await db.query(
    "INSERT INTO sensors (zone, moisture, temperature, pressure, time) VALUES ($1, $2, $3, $4, NOW())",
    [zone, moisture, temperature, pressure]
  );

  res.json({ status: "OK" });
});

export default router;
