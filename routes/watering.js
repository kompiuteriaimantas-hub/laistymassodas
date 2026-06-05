import express from "express";
import axios from "axios";

const router = express.Router();

// ESP IP saugomas čia
let espIP = null;

// ESP registracija (TURI SUTAPTI SU ESP KODU)
router.post("/register-esp", (req, res) => {
  espIP = req.body.ip;
  console.log("ESP registered:", espIP);
  res.json({ status: "OK" });
});

// Siurblio valdymas
router.post("/", async (req, res) => {
  try {
    if (!espIP) {
      console.log("ESP neprisijungęs, espIP = null");
      return res.status(500).json({ error: "ESP neprisijungęs" });
    }

    const action = req.body.action;

    if (action === "pump_on") {
      console.log("Sending pump ON to:", espIP);
      await axios.get(`http://${espIP}/pump?state=on`);
      return res.json({ status: "ON" });
    }

    if (action === "pump_off") {
      console.log("Sending pump OFF to:", espIP);
      await axios.get(`http://${espIP}/pump?state=off`);
      return res.json({ status: "OFF" });
    }

    res.status(400).json({ error: "Nežinoma komanda" });

  } catch (err) {
    console.error("Pump error:", err);
    res.status(500).json({ error: "Nepavyko valdyti siurblio" });
  }
});

export default router;
