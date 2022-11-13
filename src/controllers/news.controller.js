import mongoose from 'mongoose'
import { createService, findAllService, countNews, topNewsServices, findByIdService, searchByTitleService, byUserService, updateService, eraseService } from '../services/news.service.js'

export const create = async (req, res) => {
    try {
        const { title, text, banner } = req.body

        if (!title || !text || !banner) {
            return res.status(400).send({ message: "Submit all fields for registration" })
        }

        await createService({ title, text, banner, user: req.userId })
        res.sendStatus(201)
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}

export const findtAll = async (req, res) => {
    try {

        let { limit, offset } = req.query;

        limit = Number(limit)
        offset = Number(offset)

        if (!limit && !offset) {
            limit = 5
            offset = 0
        }

        const news = await findAllService(offset, limit)
        const total = await countNews()
        const URL = req.baseUrl

        const next = offset + limit
        const nextUrl = next < total ? `${URL}?limit=${limit}&offset=${next}` : null

        const previews = offset - limit < 0 ? null : offset - limit
        const previewsUrl = previews !== null ? `${URL}?limit=${limit}&offset=${previews}` : null

        if (news.length === 0) {
            res.status(400).send({ message: "There are no registered news" })
        }
        res.status(200).send({
            nextUrl,
            previewsUrl,
            limit,
            offset,
            total,

            results: news.map((item) => ({
                id: item._id,
                title: item.title,
                text: item.text,
                banner: item.banner,
                likes: item.likes,
                coments: item.coments,
                name: item.user.name,
                userName: item.user.userName,
                userAvatar: item.user.avatar,
            }))

        })
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

export const topNews = async (req, res) => {    //Aula 22
    try {
        const news = await topNewsServices()

        if (news.length === 0) {
            res.status(400).send({ message: "There is no registered post" })
        }

        res.status(200).send({
            news: {
                id: news.id,
                title: news.title,
                text: news.text,
                banner: news.banner,
                likes: news.likes,
                coments: news.coments,
                name: news.user.name,
                userName: news.user.userName,
                userAvatar: news.user.avatar,
            }
        })

    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

export const findById = async (req, res) => {   //Aula 23
    try {
        const { id } = req.params
        const news = await findByIdService(id)
        
        res.status(201).send({
            news: {
                id: news._id,
                title: news.title,
                text: news.text,
                banner: news.banner,
                likes: news.likes,
                coments: news.coments,
                name: news.user.name,
                userName: news.user.userName,
                userAvatar: news.user.avatar,
            }
        })
    } catch (err) {
        res.status(500).send({ message: err.message })
     }
}

export const searchByTitle = async (req, res) => { //Aula 24

    try {
        
        const { title } = req.query
        const news = await searchByTitleService(title)

        if(news.length === 0){
           return res.status(400).send({message: "There are no news with this title"})
        }
    
        res.status(200).send({
            results: news.map((item) => ({
                id: item.id,
                title: item.title,
                text: item.text,
                banner: item.banner,
                likes: item.likes,
                coments: item.coments,
                name: item.user.name,
                userName: item.user.userName,
                userAvatar: item.user.avatar,
            }))
        })
    } catch (err) {
        res.status(500).send({message: err.message})
    }

}

export const byUser = async (req, res) =>{    //Aula 25
     try {
    
      const id = req.userId
      const news = await byUserService(id)
   
      res.status(200).send({
        results: news.map((item) => ({
            id: item._id,
            title: item.title,
            text: item.text,
            banner: item.banner,
            likes: item.likes,
            coments: item.coments,
            name: item.user.name,
            userName: item.user.userName,
            userAvatar: item.user.avatar,
        }))
      })   
     } catch (err) {
        res.status(500).send({message: err.message})
     }
}

export const update = async (req, res) =>{   //Aula 26
       try {
         const { title, text, banner } = req.body
         const { id } = req.params
         
         if( !title && !text && !banner){
            return res.sendStatus(400)
         }

         if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ message: "Invalid ID" })
        }
         
         const news = await findByIdService(id)


         if(String(news.user._id) !== req.userId){
            return res.status(400).send({message: "You didn't update this post"})
         }

         await updateService (id, title, text, banner)

         res.status(201).send({message: "Post successfully update!"})
       } catch (err) {
        res.status(500).send({message: err.message})
       }
}

export const erase = async (req, res) => {
    try {
        const id = req.params.id
        const news = await findByIdService(id)

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ message: "Invalid ID" })
        }
         
        if(String(news.user._id) !== req.userId){
            return res.status(400).send({message: "You didn't deleted this post"})
         }

        await eraseService(id)
        
        res.status(201).send({message: "Pos deleted successfully"})
    } catch (err) {
        res.status(201).send({message: err.message})
    }
}






