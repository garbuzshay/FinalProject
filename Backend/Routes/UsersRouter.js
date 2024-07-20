import { Router } from "express";
import {
  getUsers,
  updateUser,
  getUserById,
  deleteUser,
} from "../Controllers/UsersController.js";
import authenticateUser from "../Middlewares/AuthenticateUser.js";
import authorizeUser from "../Middlewares/AuthorizeUser.js";
const router = Router();

router.get("/", authenticateUser, authorizeUser("Admin"), getUsers);
router.get("/:id", getUserById);

router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
