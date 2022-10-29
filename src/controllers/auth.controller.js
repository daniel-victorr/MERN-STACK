import { findOne, generateToken } from "../services/authe.service.js";
import bcrypt from 'bcrypt'


const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await findOne(email);

        if (!user) {
            return res.status(404).send({ message: 'User or Password not found' })
        }
        const passwordIsValid = bcrypt.compareSync(password, user.password)

        if (!passwordIsValid) {
            return res.status(404).send({ message: 'User or Password not found' })
        }

        const token = generateToken(user.id)

        res.status(201).send({ token });
    } catch (err) {
        res.status(500).send({message: err.message});
    }
}
export { login }