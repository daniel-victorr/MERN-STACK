import User from '../models/User.js'

const create = (body) => User.create(body)

const findAll = () => User.find({})

const findById = (id) => User.findById(id)

const update = (id ,name, userName, email, password, avatar, background) =>
    User.findByIdAndUpdate({_id: id},{name, userName, email, password, avatar, background})


export default {
    create, findAll, findById, update,
};