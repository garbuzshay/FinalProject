import {Router} from 'express';
import AuthRouter from './AuthRouter.js';
import PlansRouter from './PlansRouter.js';
import RequestsRouter from './RequestsRouter.js';
import UsersRouter from './UsersRouter.js';
import MuseumRouter from './MuseumRouter.js'
import ExhibitionRouter from './ExhibitionRouter.js';
import authenticateUser from '../Middlewares/AuthenticateUser.js';
const router = Router();

router.use('/auth', AuthRouter);
router.use('/plans', PlansRouter);
router.use('/requests', RequestsRouter);
router.use('/users', UsersRouter);
router.use('/museums', MuseumRouter)
router.use('/exhibitions', ExhibitionRouter);

export default router