import mongoose, { Types } from 'mongoose'

const NewsSchima = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    banner: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createAd: {
        type: Date,
        default: Date.now()
    },
    likes: {
        type: Array,
        required: true
    },
    coments: {
        type: Array,
        required: true
    }
})

const News = mongoose.model('News',NewsSchima)
export default News