import { Router } from 'express';
import AuthRouter from './AuthRouter.js';
import PlansRouter from './PlansRouter.js';
import RequestsRouter from './RequestsRouter.js';
import UsersRouter from './UsersRouter.js';
import MuseumRouter from './MuseumRouter.js';
import ExhibitionRouter from './ExhibitionRouter.js';
import ContactUsRouter from './ContactUsRouter.js'; // Import the new ContactUsRouter
import authenticateUser from '../Middlewares/AuthenticateUser.js';
import ArtworkRouter from './ArtworkRouter.js';
import ArtistRouter from './ArtistRouter.js';
import geminiRoutes from './GeminiRoutes.js';

const router = Router();

router.use('/auth', AuthRouter);
router.use('/plans', PlansRouter);
router.use('/requests', RequestsRouter);
router.use('/users', UsersRouter);
router.use('/museums', MuseumRouter);
router.use('/exhibitions', ExhibitionRouter);
router.use('/contact', ContactUsRouter); // Add the new ContactUsRouter
router.use('/artworks', ArtworkRouter);
router.use('/artists', ArtistRouter);
router.use('/gemini', geminiRoutes);

export default router;
