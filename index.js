import express from 'express';           
import cors from 'cors';                  // alt + shift + f
import connectedDataBase from './src/database/db.js';
import userRouter from './src/routes/user.routes.js';
import authRouter from './src/routes/auth.routes.js';
import newsRouter from './src/routes/news.routes.js';
import dotenv from 'dotenv';
import swaggerRoute from "./src/routes/swagger.route.cjs";

dotenv.config() 

const app = express()
app.use(cors())

const port = process.env.PORT || 3000
connectedDataBase()

app.use(express.json())

app.use('/user', userRouter)
app.use('/auth', authRouter)
app.use('/news', newsRouter)
app.use("/doc", swaggerRoute);

app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port} http://localhost:3000`)
})