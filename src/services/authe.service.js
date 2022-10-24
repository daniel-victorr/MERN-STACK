import User from "../models/User.js";

const create = (body) => User.create(body) 

const findOne = (email) => User.findOne({email:email}).select('+password')

export { create, findOne } 