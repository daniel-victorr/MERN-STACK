import { Router } from 'express';
import { createNew, getAll} from '../controllers/news.controller.js';
import { authMeddleware } from '../middlewares/auth.middleware.js'

const router = Router();

router.post('/', authMeddleware, createNew);
router.get('/', authMeddleware, getAll);

export default router;