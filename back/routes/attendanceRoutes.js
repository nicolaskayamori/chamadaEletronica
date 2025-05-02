// routes/attendanceRoutes.js
const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const { authenticate, isStudent, isTeacher } = require('../middleware/auth');

// Registrar presença (aluno)
router.post('/', authenticate, isStudent, attendanceController.registerAttendance);

// Obter presenças de uma aula (professor)
router.get('/class/:classId', authenticate, isTeacher, attendanceController.getClassAttendances);

// Histórico do aluno
router.get('/history', authenticate, isStudent, attendanceController.getStudentAttendances);

module.exports = router;