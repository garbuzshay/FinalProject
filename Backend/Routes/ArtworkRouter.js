import express from 'express';
import { createArtwork, getArtworks, getArtworkById, updateArtwork, deleteArtwork } from '../Controllers/ArtworkController.js';

const router = express.Router();

router.post('/', createArtwork);
router.get('/', getArtworks);
router.get('/:id', getArtworkById);
router.put('/:id', updateArtwork);
router.delete('/:id', deleteArtwork);

export default router;
