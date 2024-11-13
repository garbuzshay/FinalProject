// Backend/Routes/ReviewRouter.js
import { Router } from 'express';
import { submitReview, getMuseumReviews } from '../Controllers/ReviewsController.js';

const router = Router();

router.post('/', submitReview); // Endpoint for submitting feedback
router.get('/:museumId', getMuseumReviews); // Endpoint for retrieving reviews for a museum

export default router;
