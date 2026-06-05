import express from "express";
import cors from "cors";
import sensors from "./routes/sensors.js";
import watering from "./routes/watering.js";
import schedules from "./routes/schedules.js";
import registerEsp from "./routes/registerEsp.js";
import wateringRoutes from "./routes/watering.js";


const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/sensors", sensors);
app.use("/api/watering", watering);
app.use("/api/schedules", schedules);
app.use("/api/register-esp", registerEsp);
app.use("/api/watering", wateringRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("API veikia ant porto:", port));
