const mongoose = require('mongoose');

const connectDB = async () => {
    const conn = await mongoose.connect("mongodb+srv://kalpesh:Kalpesh3takle@cluster0.yrrot.mongodb.net/test", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};

module.exports = connectDB;