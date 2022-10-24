import express from 'express'                             // alt + shift + f
import connectedDataBase from './src/database/db.js'
import userRouter from './src/routes/user.routes.js'
import autheRouter from './src/routes/auth.routes.js'
import dotenv from 'dotenv'

dotenv.config() 

const app = express()
const port = process.env.port || 3000

connectedDataBase()

app.use(express.json())

app.use('/user', userRouter)
app.use('/authe', autheRouter)

app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port} http://localhost:3000`)
})