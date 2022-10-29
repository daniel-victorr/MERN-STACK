import express from 'express'
import { create, findAll, fidUserById, update } from '../controllers/user.controller.js'
import { validUser, validId } from '../middlewares/global.middlewares.js'

const router = express.Router()

router.post('/', create);
router.get('/', findAll)
router.get('/:id', validId, validUser, fidUserById)
router.patch('/:id', validId, validUser, update)

export default  router;
