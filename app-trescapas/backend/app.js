const express = require("express");
const cors = require("cors");
const tareaRoutes = require("./routes/tareaRoutes");

const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(express.json());

// Rutas
app.use("/api/tareas", tareaRoutes);

module.exports = app;
