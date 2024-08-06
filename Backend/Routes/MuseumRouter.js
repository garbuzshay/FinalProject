import { Router } from 'express';
import {
  createMuseum,
  getMuseums,
  getMuseumById,
  updateMuseum,
  deleteMuseum,
  getMuseumByCurator ,
  getUserMuseum,
  verifyMuseumPassword,
  getMuseumDetails
} from '../Controllers/MuseumController.js';
import authenticateUser from '../Middlewares/AuthenticateUser.js';


const router = Router();
router.get('/', getMuseums);
// router.get('/owner',authenticateUser,  getMuseumByOwnerId); // Add the new route
router.get('/my',authenticateUser, getUserMuseum); // Corrected route

router.get('/:id', getMuseumById);
//
router.get('/curator/:curatorId', authenticateUser, getMuseumByCurator); // Corrected route
//
router.post('/', createMuseum);
router.put('/:id', updateMuseum);

router.delete('/:id', deleteMuseum);

router.post('/verify-password', verifyMuseumPassword); // New route for password verification
router.get('/details/:museumName', getMuseumDetails); // New route for fetching museum details
export default router;
