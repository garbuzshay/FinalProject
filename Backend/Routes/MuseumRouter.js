import { Router } from 'express';
import {
  createMuseum,
  getMuseums,
  getMuseumById,
  updateMuseum,
  deleteMuseum,
} from '../controllers/MuseumController.js';

const router = Router();

router.post('/', createMuseum);
router.get('/', getMuseums);
router.get('/:id', getMuseumById);
router.put('/:id', updateMuseum);
router.delete('/:id', deleteMuseum);

export default router;
