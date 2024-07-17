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
router.get('/', getMuseums);
router.get('/:id', getMuseumById);
router.get('/owner/:ownerId', getMuseumByOwnerId); // Add the new route

router.post('/', createMuseum);
router.put('/:id', updateMuseum);

router.delete('/:id', deleteMuseum);
export default router;
