const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const databaseConfig = require('./config/db.js');
const attendanceRoutes = require('./routes/attendanceRoutes');
const classRoutes = require('./routes/classRoutes.js')

require('module-alias/register');
require('dotenv/config');

const server = express()

server.use(cors());
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
databaseConfig();

server.get('/', function (req, res) {
    return res.json({ message: "API conectada" });
})

server.get('/sample', function (req, res) {
    const sample = User.find();
    return res.json(sample)
})

server.use('/attendance', attendanceRoutes);
server.use('/api', classRoutes)

server.use((req, res) => {
    res.status(404).json({ error: "Rota não encontrada" });
});



const port = process.env.PORT || 4444;
server.listen(port);

module.exports = server;    