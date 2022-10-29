import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import userService from '../services/user.service.js'

dotenv.config()

export const authMeddleware = (req, res, next) => {
     try {
        const { authorization } = req.headers
       
        if(!authorization){
            res.sendStatus(401)  
        }
        const parts = authorization.split(" ")
        
        if(parts.length !== 2){
            res.sendStatus(401)     
        }
        const [schema, token] = parts;

        if(schema !== "Bearer"){
            res.sendStatus(401)     
        }
        
        jwt.verify (token, process.env.SECRET_TOKEN, async (error, decoded) => {
            if(error){
                return res.status(401).send({message: "Token invalid"})
            }
            
            const user = await userService.findById(decoded.id)
            
            if(!user || !user.id){
                return res.status(401).send({message: "Token invalid"})
            }  
            req.userId = decoded.id
            return next()
        })
     } catch (err) {
        res.status(401).send({message: err.message});
     }
}