import express from "express";
import cors from "cors";

import sensors from "./routes/sensors.js";
import schedules from "./routes/schedules.js";
import watering from "./routes/watering.js"; // VIENAS watering
// registerEsp NEBEREIKIA, nes watering.js turi register-esp

const app = express();
app.use(cors());
app.use(express.json());

// API maršrutai
app.use("/api/sensors", sensors);
app.use("/api/schedules", schedules);
app.use("/api/watering", watering); // TIK VIENAS
// register-esp dabar yra watering.js viduje

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("API veikia ant porto:", port));
