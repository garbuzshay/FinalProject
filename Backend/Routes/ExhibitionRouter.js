import express from 'express';
import { createExhibition, getExhibitions, getExhibitionById, updateExhibition, deleteExhibition } from '../Controllers/ExhibitionController.js';
import authenticateUser from '../Middlewares/AuthenticateUser.js';
import authorizeUser from '../Middlewares/AuthorizeUser.js';
const router = express.Router();

router.post('/',authenticateUser,authorizeUser("MuseumOwner") ,createExhibition);
router.get('/', getExhibitions);
router.get('/:id', getExhibitionById);
router.put('/:id', updateExhibition);
router.delete('/:id', deleteExhibition);

export default router;
