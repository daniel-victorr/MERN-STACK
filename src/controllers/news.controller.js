import { createNews, getAllNews } from '../services/news.service.js'

export const create = async (req, res) => {
    try {
        const { title, text, banner } = req.body

        if (!title || !text || !banner) {
            return res.status(400).send({ message: "Submit all fields for registration" })
        }
        await createNews({title, text, banner, user:'635b291cea757a00583f1087'})
        res.send(201)
    }
    catch(err) {
        res.status(500).send({ message: err.message })
    }
}

export const getAll = async (req, res) => {
    try {
        const news = await getAllNews()

        if (news.length === 0) {
            res.status(404).send({ message: "There are no registered news" })
        }
        res.status(200).send(news)
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}






