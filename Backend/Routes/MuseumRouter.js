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
// router.get('/owner',authenticateUser,  getMuseumByOwnerId); 
router.get('/my',authenticateUser, getUserMuseum); 

router.get('/:id', getMuseumById);
//
router.get('/curator/:curatorId', authenticateUser, getMuseumByCurator); 
//
router.post('/',authenticateUser, createMuseum);
router.put('/:id',authenticateUser, updateMuseum);

router.delete('/:id', deleteMuseum);

router.post('/verify-password', verifyMuseumPassword); // New route for password verification
router.get('/details/:museumName', getMuseumDetails); // New route for fetching museum details
export default router;
