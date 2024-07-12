import {Router} from 'express';
import { getUsers, updateUser, getUserById, deleteUser} from '../Controllers/UsersController.js';
const router = Router();



router.get('/', getUsers);
router.get('/:id', getUserById);

router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;