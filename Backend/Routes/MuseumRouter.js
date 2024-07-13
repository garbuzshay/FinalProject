import { Router } from 'express';
import {
  createMuseum,
  getMuseums,
  getMuseumById,
  updateMuseum,
  deleteMuseum,
  getMuseumByOwnerId // Import the new controller function
} from '../controllers/MuseumController.js';

const router = Router();

router.post('/', createMuseum);
router.get('/', getMuseums);
router.get('/:id', getMuseumById);
router.put('/:id', updateMuseum);
router.delete('/:id', deleteMuseum);
router.get('/owner/:ownerId', getMuseumByOwnerId); // Add the new route
export default router;
