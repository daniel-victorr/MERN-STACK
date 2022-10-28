import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = (id) => jwt.sign({ id: id }, process.env.SECRET_TOKEN, { expiresIn: 86400 })

const findOne = (email) => User.findOne({ email: email }).select('+password')

export { findOne, generateToken } 