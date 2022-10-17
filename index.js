
import express from 'express'
import connectedDataBase from './src/database/db.js'
import userRouter from './src/routes/user.routes.js'
const app = express()


connectedDataBase()
app.use(express.json())
app.use('/user', userRouter)

app.listen(3000, () => {
    console.log('Servidor rodando na porta: 3000 http://localhost:3000')
})