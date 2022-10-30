import News from '../models/News.js'

const createNews = (body) => News.create(body)

const getAllNews = (offset, limit) => News.find({}).sort({_id: -1}).skip(offset).limit(limit).populate("user")

const countNews = () => News.countDocuments()

export{
 createNews, getAllNews, countNews
}

