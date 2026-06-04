import express from "express";
import fetch from "node-fetch";
import db from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { action } = req.body;

  const result = await db.query("SELECT esp_ip FROM system WHERE id = 1");
  const ESP_IP = result.rows[0].esp_ip;

  try {
    const espRes = await fetch(`http://${ESP_IP}/pump?state=${action}`);
    const text = await espRes.text();

    res.json({ status: action === "on" ? "ON" : "OFF" });
  } catch (err) {
    res.status(500).json({ error: "ESP nepasiekiamas", ip: ESP_IP });
  }
});

export default router;
