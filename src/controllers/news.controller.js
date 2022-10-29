import { createNews, getAllNews } from '../services/news.service.js'

  const createNew = async (req, res) => {
    try {
        const { title, text, banner } = req.body

        if (!title || !text || !banner) {
            return res.status(400).send({ message: "Submit all fields for registration" })
        }

        await createNews({title, text, banner, user:req.userId})
        res.sendStatus(201)
    }
    catch(err) {
        res.status(500).send({message: err.message});
    }
}

  const getAll = async (req, res) => {
    try {
        const news = await getAllNews()

        if (news.length === 0) {
            res.status(400).send({ message: "There are no registered news" })
        }
        res.status(200).send(news)
    } catch (err) {
        res.status(500).send({message: err.message});
    }
}

export { getAll, createNew }





