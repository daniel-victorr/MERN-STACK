import { Router } from 'express';
import { createNew, getAll, topNews, findById, searchByTitle} from '../controllers/news.controller.js';
import { authMeddleware } from '../middlewares/auth.middleware.js'


const router = Router();

router.post('/', authMeddleware, createNew);
router.get('/', getAll);
router.get('/top', topNews);
router.get('/search', searchByTitle)
router.get('/:id', findById);

export default router;