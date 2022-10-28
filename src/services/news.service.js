import News from '../models/News.js'

const createNews = (body) => News.create(body)

const getAllNews = () => News.find({})


export{
 createNews, getAllNews
}

