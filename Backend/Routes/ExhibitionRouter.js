import express from "express";
import {
  createExhibition,
  getExhibitions,
  getExhibitionById,
  updateExhibition,
  deleteExhibition,
  getUserExhibitions,
  getExhibitionsWithDetails,
  createArtworkInExhibition,
  deleteArtworkFromExhibition,
  closeExhibition,
  reopenExhibition,
} from "../Controllers/ExhibitionController.js";
import authenticateUser from "../Middlewares/AuthenticateUser.js";
import authorizeUser from "../Middlewares/AuthorizeUser.js";
const router = express.Router();

router.post(
  "/",
  authenticateUser,
  authorizeUser("MuseumOwner"),
  createExhibition
);
router.get("/", authenticateUser, getExhibitions);
router.get("/my", authenticateUser, getUserExhibitions);
router.get("/:id", getExhibitionById);
router.put(
  "/:id",
  authenticateUser,
  authorizeUser(["Admin","MuseumOwner","Curator"]),
  updateExhibition
);
router.delete("/:id", deleteExhibition);
router.post("/:id/artworks", authenticateUser, createArtworkInExhibition);
//
router.get("/details", authenticateUser, getExhibitionsWithDetails);

//
router.delete(
  "/:id/artworks/:artworkId",
  authenticateUser,
  deleteArtworkFromExhibition
);

router.patch('/:id/close',authenticateUser,authorizeUser("MuseumOwner"), closeExhibition);
router.patch('/:id/reopen',authenticateUser,authorizeUser("MuseumOwner"), reopenExhibition);

export default router;
