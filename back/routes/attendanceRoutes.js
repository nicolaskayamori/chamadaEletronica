// routes/attendanceRoutes.js
const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
//const { authenticate, isStudent, isTeacher } = require('../middleware/auth');

// Registrar presença (aluno)
router.post('/', attendanceController.registerAttendance);

// Obter presenças de uma aula (professor)
router.get('/class/:classId', attendanceController.getClassAttendances);

// Histórico do aluno
router.get('/history', attendanceController.getStudentAttendances);

// router.get('/', attendanceController.)
module.exports = router;