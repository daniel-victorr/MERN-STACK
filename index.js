const express = require('express')
const app = express()
const userRouter = require('./src/routes/user.routes')



app.use('/users', userRouter)


app.listen(3000, ()=>{
    console.log('Servidor rodando na porta: 3000 http://localhost:3000')
})