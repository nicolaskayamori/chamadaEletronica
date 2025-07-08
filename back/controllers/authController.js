// controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');


const login = async (req, res) => {
  try {
    const { registration, password } = req.body;
    const user = await User.findOne({ registration });
    
    if (!registration || !password) {
      return res.status(400).json({ error: 'Matrícula e senha são obrigatórias' });
    }
    
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({ 
      token,
      user: {
        id: user._id,
        name: user.name,
        registration: user.registration,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const register = async (req, res) =>{
  try{
    const {registration, password, name, role} = req.body;

    if (!name || !registration || !password || !role) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const existingUser = await User.findOne({ registration });
    if (existingUser) {
      return res.status(409).json({ error: 'Matrícula já registrada' });
    }

    
    const user = await User.create({
      name, 
      registration,
      password,
      role,
    })
    user.save();
    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  }catch (err){
    res.status(500).json({error:err.message});
  }
}

module.exports = {login, register};