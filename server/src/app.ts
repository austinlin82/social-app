import express = require('express');
import cors = require('cors');
import userRoutes from "./routes/userRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", userRoutes);

// health
app.get("/health", (_, res) => res.json({ ok: true }));

export default app;
