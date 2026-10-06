const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const app = express()

const PORT = process.env.PORT || 5000

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running'
    })
})


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})