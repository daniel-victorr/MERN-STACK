import { Router } from 'express';
import { create, findtAll, topNews, findById, searchByTitle, byUser, update, erase, likes, addComents, deleteComment} from '../controllers/news.controller.js';
import { authMeddleware } from '../middlewares/auth.middleware.js'


const router = Router();

router.post('/', authMeddleware, create);
router.get('/', findtAll);
router.get('/top', topNews);
router.get('/search', searchByTitle)
router.get('/byUser', authMeddleware, byUser)
router.get('/:id', authMeddleware, findById);
router.patch('/:id', authMeddleware, update)
router.delete('/:id', authMeddleware, erase)
router.patch('/like/:id', authMeddleware, likes)
router.patch('/comment/:id', authMeddleware, addComents)
router.patch('/comment/:idNews/:idComment', authMeddleware, deleteComment)

export default router;