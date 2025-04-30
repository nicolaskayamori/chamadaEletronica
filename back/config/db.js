const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        console.log("Connecting...")
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Conectado ao banco de dados!")
    } catch (error) {
        console.log(error.message)
        process.exit(1);
    }
}

module.exports = connectDB;