import News from '../models/News.js'

export const createNews = (body) => News.create(body)

export const getAllNews = (offset, limit) => News.find({}).sort({_id: -1}).skip(offset).limit(limit).populate('user')

export const countNews = () => News.countDocuments()

export const topNewsServices = () => News.findOne({}).sort({_id: -1}).populate('user')

export const findByIdService = (id) => News.findById(id).populate('user')

export const searchByTitleService = (title) => News.find({
    title:{ $regex: `${title || ""}`, $options: "i"}
})
.sort({_id: -1})
.populate('user')
