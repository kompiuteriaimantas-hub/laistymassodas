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
  const { moisture, temperature, pressure, wifi } = req.body;

  console.log("Gauti duomenys:", req.body); // DEBUG

  await db.query(
    "INSERT INTO sensors (zone, moisture, temperature, pressure, time, wifi) VALUES ($1, $2, $3, $4, $5 NOW())",
    [zone, moisture, temperature, pressure]
  );

  res.json({ status: "OK" });
});

export default router;
