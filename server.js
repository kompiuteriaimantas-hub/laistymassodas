import express from "express";
import cors from "cors";

import sensors from "./routes/sensors.js";
import schedules from "./routes/schedules.js";
import watering from "./routes/watering.js";
import wateringCommand from "./routes/wateringCommand.js";

const app = express();
app.use(cors());
app.use(express.json());

// STATIC FAILAI – PRIVALO BŪTI PIRMI
app.use(express.static("."));

// API ROUTES
app.use("/api/sensors", sensors);
app.use("/api/schedules", schedules);
app.use("/api/watering", watering);
app.use("/api/watering/command", wateringCommand);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("API veikia ant porto:", port));
