import express from 'express'
import userController from '../controllers/user.controller.js'
import {validUser, validId} from '../middlewares/userMiddlewares.js'

const router = express.Router()

router.post('/', userController.create);
router.get('/', userController.findAll)
router.get('/:id', validId, validUser, userController.fidUserById)
router.patch('/:id', validId, validUser, userController.update)

export default  router;
