import express from 'express';
import { createExhibition, getExhibitions, getExhibitionById, updateExhibition, deleteExhibition } from '../Controllers/ExhibitionController.js';

const router = express.Router();

router.post('/', createExhibition);
router.get('/', getExhibitions);
router.get('/:id', getExhibitionById);
router.put('/:id', updateExhibition);
router.delete('/:id', deleteExhibition);

export default router;
