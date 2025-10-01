const express = require('express');
const cors = require('cors');

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
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0'
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

// Rutas de la API - Simuladas para testing
app.get('/api/tareas', (req, res) => {
  res.json({
    success: true,
    message: 'Endpoint de tareas funcionando',
    data: []
  });
});

app.post('/api/tareas', (req, res) => {
  res.json({
    success: true,
    message: 'Tarea creada exitosamente',
    data: {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date()
    }
  });
});

app.get('/api/auth/login', (req, res) => {
  res.json({
    success: true,
    message: 'Endpoint de login funcionando'
  });
});

app.post('/api/auth/login', (req, res) => {
  res.json({
    success: true,
    message: 'Login exitoso',
    data: {
      token: 'test_token_' + Date.now(),
      user: {
        id: '1',
        name: 'Usuario Test',
        email: 'test@test.com'
      }
    }
  });
});

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
