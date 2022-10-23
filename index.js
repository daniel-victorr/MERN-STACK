
import express from 'express'
import connectedDataBase from './src/database/db.js'
import userRouter from './src/routes/user.routes.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.port || 3000

connectedDataBase()

app.use(express.json())

app.use('/user', userRouter)

app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port} http://localhost:3000`)
})