const dotenv = require('dotenv');
const path = require('path');

// Cargar variables de entorno
dotenv.config({ path: path.join(__dirname, '../.env') });

const config = {
  // Base de datos
  database: {
    uri: process.env.MONGODB_URI || 'mongodb+srv://tandemtask-admin:TandemTask2025!@cluster0.eeoivuk.mongodb.net/tandemtask?retryWrites=true&w=majority&appName=Cluster0',
    options: {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }
  },

  // Servidor
  server: {
    port: parseInt(process.env.PORT, 10) || 3001,
    env: process.env.NODE_ENV || 'development',
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:3000',
      credentials: true
    }
  },

  // JWT
  jwt: {
    secret: process.env.JWT_SECRET || 'fallback_secret_change_in_production',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    issuer: 'tandemtask-api',
    audience: 'tandemtask-client'
  },

  // Rate Limiting
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000, // 15 minutos
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10) || 100 // límite por IP
  },

  // Logging
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    format: process.env.NODE_ENV === 'production' ? 'json' : 'combined'
  },

  // Validación
  validation: {
    maxTitleLength: 200,
    maxAssigneeLength: 100,
    maxDescriptionLength: 1000
  },

  // Email - Configuración
  email: {
    provider: process.env.EMAIL_PROVIDER || 'gmail', // 'gmail' o 'resend'
    gmail: {
      user: process.env.GMAIL_USER,
      appPassword: process.env.GMAIL_APP_PASSWORD
    },
    resend: {
      apiKey: process.env.RESEND_API_KEY,
      fromEmail: process.env.RESEND_FROM_EMAIL || 'noreply@resend.dev'
    }
  }
};

// Validar configuración crítica
const validateConfig = () => {
  const required = ['MONGODB_URI', 'JWT_SECRET'];
  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0 && process.env.NODE_ENV === 'production') {
    throw new Error(`Faltan variables de entorno críticas: ${missing.join(', ')}`);
  }

  if (process.env.JWT_SECRET === 'fallback_secret_change_in_production' && process.env.NODE_ENV === 'production') {
    throw new Error('JWT_SECRET debe ser configurado en producción');
  }
};

module.exports = { config, validateConfig };
