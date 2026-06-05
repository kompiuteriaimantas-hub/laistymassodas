import express from "express";
import db from "../db.js";

const router = express.Router();

// Paskutiniai 20 įrašų
router.get("/", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT id, zone, moisture, temperature, pressure, wifi, bytes, time FROM sensors ORDER BY id DESC LIMIT 20"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Klaida GET /api/sensors:", err);
    res.status(500).json({ error: "Serverio klaida" });
  }
});

// VISI įrašai (grafikams)
router.get("/all", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT id, zone, moisture, temperature, pressure, wifi, bytes, time FROM sensors ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Klaida GET /api/sensors/all:", err);
    res.status(500).json({ error: "Serverio klaida" });
  }
});

// POST iš ESP
router.post("/", async (req, res) => {
  try {
    const zone = req.body.zone || 1;
    const moisture = req.body.moisture ?? null;
    const temperature = req.body.temperature ?? null;
    const pressure = req.body.pressure ?? null;
    const wifi = req.body.wifi ?? null;
    const bytes = req.body.bytes ?? null;

    await db.query(
      "INSERT INTO sensors (zone, moisture, temperature, pressure, wifi, bytes) VALUES ($1, $2, $3, $4, $5, $6)",
      [zone, moisture, temperature, pressure, wifi, bytes]
    );

    res.json({ status: "OK" });
  } catch (err) {
    console.error("Klaida POST /api/sensors:", err);
    res.status(500).json({ error: "Serverio klaida" });
  }
});

export default router;
