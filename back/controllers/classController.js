const Class = require('../models/Class');
const QRCode = require('qrcode');

const createClass = async (req, res) => {
  try {
    const { subject } = req.body;
    const teacherId = req.user.id; // ID do professor do token JWT

    // Gera dados únicos para o QR Code
    const qrCodeData = JSON.stringify({
      classId: new mongoose.Types.ObjectId(),
      teacherId,
      subject,
      expiresAt: new Date(Date.now() + 30 * 60000) // Expira em 30 minutos
    });

    // Cria a nova aula no banco de dados
    const newClass = await Class.create({
      teacher: teacherId,
      subject,
      qrCodeData,
      expiresAt: new Date(Date.now() + 30 * 60000) // 30 minutos para registrar presença
    });

    // Gera a imagem do QR Code em base64
    const qrCodeImage = await QRCode.toDataURL(qrCodeData);

    res.status(201).json({
      success: true,
      class: newClass,
      qrCodeImage
    });

  } catch (error) {
    console.error('Erro ao criar aula:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao criar aula',
      error: error.message
    });
  }
};

const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find()
      .populate('teacher', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      classes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar aulas'
    });
  }
};

module.exports = {createClass, getAllClasses}