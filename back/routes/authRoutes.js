const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../middleware/auth');
const rateLimit = require('express-rate-limit');
const {authenticate} = require('../middleware/auth');

// Configuração de rate limiting para prevenção de brute force
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 20, // Limite de 20 tentativas por IP
  message: 'Muitas tentativas de login. Tente novamente mais tarde.'
});

// Rotas públicas (sem autenticação necessária)
router.post('/register', 
  validateRegister, // Middleware de validação
  authController.register
);

router.post('/login', 
  authLimiter, // Proteção contra brute force
  validateLogin, // Middleware de validação
  authController.login
);

router.post('/refresh-token', 
  authController.refreshToken
);

router.post('/forgot-password', 
  authController.forgotPassword
);

router.post('/reset-password/:token', 
  authController.resetPassword
);

// Rotas protegidas (requerem autenticação)
router.get('/me', 
  authenticate, // Middleware de autenticação JWT
  authController.getCurrentUser
);

router.put('/update-details', 
  authenticate,
  authController.updateDetails
);

router.put('/update-password', 
  authenticate,
  authController.updatePassword
);

router.post('/logout', 
  authenticate,
  authController.logout
);

module.exports = router;