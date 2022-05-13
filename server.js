require('dotenv').config()
const express = require('express')
const server = express()
const PORT = process.env.PORT || 3000
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const router = require('./router/index')
const errorMiddleware = require('./middlware/error-middleware')

server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(cookieParser())
server.use(cors({ origin: 'http://localhost:3000' }))
server.use('/api', router)
server.use(errorMiddleware)

async function start() {
   try {
      await mongoose.connect(
         process.env.DB_CONN,
         {
            useNewUrlParser: true,
            useUnifiedTopology: true,
         },
         () => console.log('БД подключена\n===================================='),
      )
      server.listen(PORT, () => {
         console.log(`====================================\nСервер запущен, порт: ${PORT}\n====================================`)
      })
   } catch (e) {
      console.log(e)
   }
}

start()
