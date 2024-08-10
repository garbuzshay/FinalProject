// Backend/Routes/geminiRoutes.js
import express from 'express';
import { generateStory, generateArtworkDescription } from '../Controllers/GeminiController.js';

const router = express.Router();

router.post('/generate-text', generateStory); // Route to generate text from a prompt
router.post('/generate-artwork-description', generateArtworkDescription); // Route to generate text from a prompt and image

export default router;
