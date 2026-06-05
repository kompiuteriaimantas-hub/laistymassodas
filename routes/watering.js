import express from "express";
import axios from "axios";

const router = express.Router();

// ESP IP saugomas register-esp route
let espIP = null;

// gaunam IP iš register-esp
router.post("/register", (req, res) => {
  espIP = req.body.ip;
  console.log("ESP registered:", espIP);
  res.json({ status: "OK" });
});

// valdymas
router.post("/", async (req, res) => {
  try {
    if (!espIP) return res.status(500).json({ error: "ESP neprisijungęs" });

    const action = req.body.action;

    if (action === "pump_on") {
      await axios.get(`http://${espIP}/pump?state=on`);
      return res.json({ status: "ON" });
    }

    if (action === "pump_off") {
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
