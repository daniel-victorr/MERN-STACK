import userService from '../services/user.service.js'

const create = async (req, res) => {
    try {
        const { name, userName, email, password, avatar, background } = req.body

        if (!name || !userName || !email || !password || !avatar || !background) {
            res.status(400).send({ message: "Submint all fields for registraion" })
        }

        const user = await userService.create(req.body)
            .catch((err) => console.log(err.message));

        if (!user) {
            return res.status(400).send({ message: "Error creating User" })
        }

        res.status(201).send({
            message: "user created successfully",
            user: {
                id: user._id,
                name,
                userName,
                email,
                avatar,
                background
            }
        })
    } catch (err) {
        res.status(500).send({ message: message.err })
    }
}

const findAll = async (req, res) => {
    try {
        const users = await userService.findAll();

        if (users.length === 0) {
            res.status(404).send({ message: "There are no registered users" })
        }
        res.status(200).send(users)
    } catch (err) {
        res.status(500).send({ message: message.err })
    }
}

const fidUserById = (req, res) => {

    try {
        const user = req.user
        res.status(201).send(user)
    } catch (err) {
        res.status(500).send({ message: message.err })
    }
}

const update = async (req, res) => {
    try {
        const { name, userName, email, password, avatar, background } = req.body
        const id = req.id

        if (!name && !userName && !email && !password && !avatar && !background) {
            res.status(400).send({ message: "Submint at least one field for update" })
        }

        await userService.update(
            id,
            name,
            userName,
            email,
            password,
            avatar,
            background)

        res.status(201).send({ message: "User successfully updated" })
    } catch (err) {
        res.status(500).send({ message: message.err })
    }
}

export { create, findAll, fidUserById, update }