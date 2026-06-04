import express from "express";
import db from "../db.js";

const router = express.Router();

// GET – grąžina paskutinius 20 įrašų (su wifi)
router.get("/", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT id, zone, moisture, temperature, pressure, wifi, time FROM sensors ORDER BY id DESC LIMIT 20"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Klaida GET /api/sensors:", err);
    res.status(500).json({ error: "Serverio klaida" });
  }
});

// POST – priima duomenis iš ESP (su wifi)
router.post("/", async (req, res) => {
  try {
    const { zone, moisture, temperature, pressure, wifi } = req.body;

    await db.query(
      "INSERT INTO sensors (zone, moisture, temperature, pressure, wifi, time) VALUES ($1, $2, $3, $4, $5, NOW())",
      [zone, moisture, temperature, pressure, wifi]
    );

    res.json({ status: "OK" });
  } catch (err) {
    console.error("Klaida POST /api/sensors:", err);
    res.status(500).json({ error: "Serverio klaida" });
  }
});

export default router;
