import { Router } from 'express';
import {
  createMuseum,
  getMuseums,
  getMuseumById,
  updateMuseum,
  deleteMuseum,
  getMuseumByOwnerId // Import the new controller function
} from '../Controllers/MuseumController.js';
import authenticateUser from '../Middlewares/AuthenticateUser.js';


const router = Router();
router.get('/', getMuseums);
router.get('/owner',authenticateUser,  getMuseumByOwnerId); // Add the new route
router.get('/:id', getMuseumById);

router.post('/', createMuseum);
router.put('/:id', updateMuseum);

router.delete('/:id', deleteMuseum);
export default router;
