const express = require("express");
const cors = require("cors");
const tareaRoutes = require("./routes/tareaRoutes");
const authRoutes = require("./routes/authRoutes");
const { config } = require('./config/environment');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString(),
    environment: config.server.env,
    version: process.env.npm_package_version || '1.0.0'
  });
});

// API Info endpoint
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'TandemTask API',
    version: '1.0.0',
    documentation: '/api/docs',
    endpoints: {
      tasks: '/api/tareas',
      auth: '/api/auth',
      users: '/api/users'
    }
  });
});

// Rutas de la API
app.use('/api/tareas', tareaRoutes);
app.use('/api/auth', authRoutes);

// Middleware para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint no encontrado',
    path: req.path,
    method: req.method
  });
});

// Middleware de manejo de errores (debe ir al final)
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor'
  });
});

module.exports = app;
