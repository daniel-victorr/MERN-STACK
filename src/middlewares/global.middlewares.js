import userService from '../services/user.service.js'
import mongoose from 'mongoose';

export const validId = async (req, res, next) => {
    try {
        const id = req.params.id

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ message: "Invalid ID" })
        }
        next()
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

export const validUser = async (req, res, next) => {
    try {
        const id = req.params.id
        const user = await userService.findById(id)

        if (!user) {
            res.status(404).send({ message: "User not found" })
        }
        req.user = user
        req.id = id
        next()
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}