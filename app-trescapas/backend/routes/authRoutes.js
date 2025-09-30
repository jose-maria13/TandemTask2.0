const express = require('express');
const router = express.Router();

// Rutas de autenticación básicas
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validación básica
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email y contraseña son requeridos'
      });
    }

    // Simulación de login (en producción usarías una base de datos)
    if (email === 'test@test.com' && password === '123456') {
      res.json({
        success: true,
        message: 'Login exitoso',
        data: {
          token: 'token_simple_' + Date.now(),
          user: {
            id: '1',
            name: 'Usuario Test',
            email: 'test@test.com',
            avatar: 'default',
            isEmailVerified: true,
            lastLogin: new Date()
          }
        }
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validación básica
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Nombre, email y contraseña son requeridos'
      });
    }

    // Simulación de registro
    res.json({
      success: true,
      message: 'Usuario registrado exitosamente',
      data: {
        user: {
          id: Date.now().toString(),
          name,
          email,
          avatar: 'default',
          isEmailVerified: false
        }
      }
    });

  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

module.exports = router;
