const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');

// Rota POST /api/classes (protegida, apenas para professores)
router.post('/register', 
  //authenticate,      // Middleware para verificar se é professor
  authController.register
);


router.post('/login',
    authController.login
);

module.exports = router;