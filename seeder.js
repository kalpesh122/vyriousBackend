const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require("./config/db")

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models

const Task = require('./models/Task');
const User = require('./models/User');


// Connect to DB
mongoose.connect("mongodb+srv://kalpesh:Kalpesh3takle@cluster0.yrrot.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Read JSON files


const tasks = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/tasks.json`, 'utf-8')
);

const users = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
);



// Import into DB
const importData = async () => {
    try {

        await Task.create(tasks);
        await User.create(users);

        console.log('Data Imported...'.green.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
    }
};

// Delete data
const deleteData = async () => {
    try {

        await Task.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed...'.red.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
    }
};

if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
}