const Class = require('../models/Class');
const Attendance = require('../models/Attendance');
const User = require('../models/User');

// Registrar presença via QR Code
const registerAttendance = async (req, res) => {
  try {
    const { qrCodeData } = req.body;
    
    // Validação básica do formato
    if (!qrCodeData) {
      return res.status(400).json({
        success: false,
        error: 'Dados do QR Code não fornecidos'
      });
    }

    let parsedData;
    try {
      parsedData = JSON.parse(qrCodeData);
    } catch (e) {
      return res.status(400).json({
        success: false,
        error: 'QR Code inválido'
      });
    }

    // Verificar se a aula existe e é válida
    const classObj = await Class.findOne({
      _id: parsedData.classId,
      teacher: parsedData.teacherId,
      qrCodeData: qrCodeData // Garante que o QR não foi alterado
    });

    if (!classObj) {
      return res.status(404).json({
        success: false,
        error: 'Aula não encontrada ou QR Code inválido'
      });
    }

    // Verificar se o QR Code expirou
    if (new Date(parsedData.expiresAt) < new Date()) {
      return res.status(400).json({
        success: false,
        error: 'QR Code expirado'
      });
    }

    // Verificar se o aluno já registrou presença nesta aula
    const existingAttendance = await Attendance.findOne({
      student: req.user._id,
      class: classObj._id
    });

    if (existingAttendance) {
      return res.status(400).json({
        success: false,
        error: 'Presença já registrada para esta aula'
      });
    }

    // Registrar a presença
    const attendance = await Attendance.create({
      student: req.user._id,
      class: classObj._id,
      registeredAt: new Date()
    });

    res.json({
      success: true,
      attendance: {
        id: attendance._id,
        class: classObj.subject,
        date: attendance.registeredAt
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro ao registrar presença: ' + error.message
    });
  }
};

// Obter presenças de uma aula (para o professor)
const getClassAttendances = async (req, res) => {
  try {
    const { classId } = req.params;

    // Verificar se a aula pertence ao professor
    const classObj = await Class.findOne({
      _id: classId,
      teacher: req.user._id
    });

    if (!classObj) {
      return res.status(404).json({
        success: false,
        error: 'Aula não encontrada'
      });
    }

    // Buscar todas as presenças da aula
    const attendances = await Attendance.find({ class: classId })
      .populate('student', 'name registration')
      .sort({ registeredAt: -1 });

    res.json({
      success: true,
      class: {
        id: classObj._id,
        subject: classObj.subject,
        createdAt: classObj.createdAt
      },
      attendances: attendances.map(a => ({
        id: a._id,
        student: a.student.name,
        registration: a.student.registration,
        registeredAt: a.registeredAt
      }))
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar presenças: ' + error.message
    });
  }
};

// Obter histórico de presenças do aluno
const getStudentAttendances = async (req, res) => {
  try {
    const attendances = await Attendance.find({ student: req.user._id })
      .populate('class', 'subject createdAt')
      .sort({ registeredAt: -1 });

    res.json({
      success: true,
      attendances: attendances.map(a => ({
        id: a._id,
        subject: a.class.subject,
        date: a.class.createdAt,
        registeredAt: a.registeredAt
      }))
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar histórico: ' + error.message
    });
  }
};

module.exports = {getStudentAttendances, getClassAttendances, registerAttendance}