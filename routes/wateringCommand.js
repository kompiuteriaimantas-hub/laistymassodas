import express from "express";
const router = express.Router();

let pumpCommand = "none"; // "on", "off", "none"

router.post("/", (req, res) => {
  const { action } = req.body;

  if (action === "pump_on") pumpCommand = "on";
  else if (action === "pump_off") pumpCommand = "off";
  else pumpCommand = "none";

  console.log("Nauja komanda:", pumpCommand);

  res.json({ status: "OK", pump: pumpCommand });
});

router.get("/", (req, res) => {
  res.json({ pump: pumpCommand });
});

export default router;
