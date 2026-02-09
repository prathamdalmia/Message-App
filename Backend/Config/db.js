const mongoose = require("mongoose")

const connectDB = async () => {
        try {
                const conn = await mongoose.connect(process.env.DB_PATH);
                console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
        } catch (err) {
                console.log(`Failed to Connect to MongoDB : ${err.message}`.red.underline.bold);
                process.exit(1);
        }
}

module.exports = connectDB