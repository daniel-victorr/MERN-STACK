import { findOne }  from "../services/authe.service.js";
import bcrypt from 'bcrypt'


const login = async (req, res) => {
    const { email, password } = req.body    
  
    try {

        const user = await findOne(email);

        if (!user){
            return res.status(404).send({ message: 'User or Password not found' }) 
        }
        const passwordIsValid  = bcrypt.compareSync(password, user.password)

        if(!passwordIsValid){
         return res.status(404).send({ message: 'User or Password not found' })
        }
        
        res.status(201).send({message: "Login ok"});
    } catch (err) {
        res.status(500).send(err.message );
    }
}

export { login }