require('dotenv').config()

const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const router = require('./routers/router')
const app = express()

const PORT = process.env.PORT || 5001

app.use(cors({
    origin: ['http://localhost:5173', 'http://192.168.0.107:5173'],
    credentials: true
}))


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(router)

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://'0.0.0.0':${PORT}`)
})