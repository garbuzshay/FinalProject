import express from 'express';
import { createExhibition, getExhibitions, getExhibitionById, updateExhibition, deleteExhibition, getUserExhibitions, getExhibitionsWithDetails, createArtworkInExhibition, deleteArtworkFromExhibition } from '../Controllers/ExhibitionController.js';
import authenticateUser from '../Middlewares/AuthenticateUser.js';
import authorizeUser from '../Middlewares/AuthorizeUser.js';
const router = express.Router();

router.post('/',authenticateUser,authorizeUser("MuseumOwner") ,createExhibition);
router.get('/', authenticateUser, getExhibitions);
router.get('/my',authenticateUser, getUserExhibitions);
router.get('/:id', getExhibitionById);
router.put('/:id',authenticateUser,authorizeUser("MuseumOwner"), updateExhibition);
router.delete('/:id', deleteExhibition);
router.post('/:id/artworks',authenticateUser, createArtworkInExhibition);
// 
router.get('/details', authenticateUser, getExhibitionsWithDetails);

// 
router.delete('/:id/artworks/:artworkId',authenticateUser, deleteArtworkFromExhibition);

export default router;
