import express from 'express';
import { createExhibition, getExhibitions, getExhibitionById, updateExhibition, deleteExhibition, getMuseumExhibitions, getExhibitionsWithDetails } from '../Controllers/ExhibitionController.js';
import authenticateUser from '../Middlewares/AuthenticateUser.js';
import authorizeUser from '../Middlewares/AuthorizeUser.js';
const router = express.Router();

router.post('/',authenticateUser,authorizeUser("MuseumOwner") ,createExhibition);
router.get('/', authenticateUser, getExhibitions);
router.get('/my',authenticateUser,authorizeUser("MuseumOwner"), getMuseumExhibitions);
router.get('/:id', getExhibitionById);
router.put('/:id',authenticateUser,authorizeUser("MuseumOwner"), updateExhibition);
router.delete('/:id', deleteExhibition);

// 
router.get('/details', authenticateUser, getExhibitionsWithDetails);

// 
export default router;
