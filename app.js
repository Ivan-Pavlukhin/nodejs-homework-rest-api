const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config()

const { contactsRouter, authRouter, usersRouter, avatarRouter } = require('./routes/api')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.use('/api/auth', authRouter)
app.use('/api/contacts', contactsRouter)
app.use('/api/users/current', usersRouter)
app.use('/api/users/avatars', avatarRouter)
app.use('/api/users/verify', usersRouter)

app.use((_, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, _, res, __) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
