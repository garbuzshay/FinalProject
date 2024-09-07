// Backend/Controllers/geminiController.js
import { generateText, generateTextWithImage } from '../Services/GeminiService.js';

export const generateStory = async (req, res) => {
  try {
    const { prompt } = req.body; // Expecting prompt to be sent in the body of the request
    const text = await generateText(prompt);
    res.status(200).json({ text });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate text' });
  }
};

export const generateArtworkDescription = async (req, res) => {
  try {
    const data = req.body;
    const text = await generateTextWithImage(data);
    res.status(200).json({ text });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate text with image' });
  }
};