const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const indexRouter = require('./routes/index')
const whisperRouter = require('./routes/whisper')
const usersRouter = require('./routes/users')
const upload = require('./routes/upload')
const whisper = require('./controller/whisper')

const app = express()

/* allow cors from localhost:5173 */
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/whisper', whisperRouter)
app.use('/users', usersRouter)
app.use('/upload', upload)

module.exports = app
