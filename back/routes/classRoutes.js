const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
const { authenticate, isTeacher } = require('../middleware/auth');

// Rota POST /api/classes (protegida, apenas para professores)
router.post('/', 
  authenticate,    // Middleware para verificar token JWT
  isTeacher,       // Middleware para verificar se é professor
  classController.createClass
);

// Rota GET /api/classes (listar aulas)
router.get('/', 
  //authenticate,    // Verifica autenticação
  classController.getAllClasses
);

module.exports = router;