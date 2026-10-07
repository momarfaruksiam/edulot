require('dotenv').config()

const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const router = require('./routes/router')
const connectDB = require('./config/db')

const app = express()

const PORT = process.env.PORT || 5000

app.use(cors())

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(router)


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})