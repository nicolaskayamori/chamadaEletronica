const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
const { authenticate, isTeacher } = require('../middleware/auth');

// Rota POST /api/classes (protegida, apenas para professores)
router.post('/classes', 
      // Middleware para verificar token JWT
  //isTeacher, 
  authenticate,      // Middleware para verificar se é professor
  classController.createClass
);

// Rota GET /api/classes (listar aulas)
router.get('/classes', 
  authenticate,    // Verifica autenticação
  classController.getAllClasses
);

module.exports = router;