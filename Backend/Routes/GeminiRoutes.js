// // Backend/Routes/geminiRoutes.js
// import express from 'express';
// import { generateStory, generateArtworkDescription } from '../Controllers/GeminiController.js';

// const router = express.Router();

// router.post('/generate-text', generateStory); // Route to generate text from a prompt
// router.post('/generate-artwork-description', generateArtworkDescription); // Route to generate text from a prompt and image

// export default router;

// Backend/Routes/geminiRoutes.js
import express from 'express';
import { generateStory, generateArtworkDescription, generateExhibitDescriptionController } from '../Controllers/GeminiController.js';

const router = express.Router();

// Route to generate text from a prompt
router.post('/generate-text', generateStory);

// Route to generate artwork description from a prompt and image
router.post('/generate-artwork-description', generateArtworkDescription);

// New route to generate an exhibition description based on title and description
router.post('/generate-exhibit-description', generateExhibitDescriptionController);

export default router;
