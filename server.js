// mongodb+srv://kalpesh:Kalpesh3takle@cluster0.yrrot.mongodb.net/test
const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const colors = require('colors')
const connectDB = require('./config/db')
const morgan = require('morgan');
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const xss = require('xss-clean')
const mongoSanitize = require("express-mongo-sanitize")
const errorHandler = require("./middleware/error")
const cookieParser = require('cookie-parser');
const hpp = require('hpp')
const app = express()

dotenv.config({ path: './config/config.env' })

connectDB()

const tasks = require('./routes/tasks');
const auth = require('./routes/auth');
const users = require('./routes/users');

// Body Parser
app.use(express.json())

// Cookie-parser
app.use(cookieParser())

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Sanitize Data
app.use(mongoSanitize())

// Prevent XSS attacks
app.use(xss())

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 100
})
app.use(limiter)

// Prevent htpp param pollution
app.use(hpp())

// Enable Cors
app.use(cors())

app.use('/api/v1/tasks', tasks);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.get("/", (req, res) => {
    res.send("This Api is Running in Production Environment!!!!")
})

app.use(errorHandler)


const PORT = process.env.PORT || 5000


const server = app.listen(PORT, console.log(`
Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
)

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red)
    // Close Server and exit process
    server.close(() => process.exit(1))
})