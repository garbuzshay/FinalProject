// Backend/Services/Gemini/geminiService.js
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import appConfig from '../config.js';


const genAI = new GoogleGenerativeAI(appConfig.gemini.apiKey);

export const generateText = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Error generating text:', error);
    throw error;
  }
};

// export const generateTextWithImage = async (prompt, imagePath, mimeType) => {
//   try {
//     const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

//     const imagePart = {
//       inlineData: {
//         data: Buffer.from(fs.readFileSync(imagePath)).toString('base64'),
//         mimeType,
//       },
//     };

//     const result = await model.generateContent([prompt, imagePart]);
//     return result.response.text();
//   } catch (error) {
//     console.error('Error generating text with image:', error);
//     throw error;
//   }
// };

export const generateTextWithImage = async ({ title, artist, createdDateByArtist, imageUrl, description }) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    // Fetch the image from the URL
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const mimeType = "image/jpeg";
    const buffer = await response.arrayBuffer();
    const imageData = Buffer.from(buffer).toString('base64');

    const imagePart = {
      inlineData: {
        data: imageData,
        mimeType,
      },
    };
    const prompt = `Generate a short, attractive description for an artwork titled "${title}" by "${artist}", created on ${createdDateByArtist}.In your description please don't use "##" or "**" for separation. u can use the user description "${description}" for better understaing what the user needs`;
    const result = await model.generateContent([prompt, imagePart]);
    return result.response.text();
  } catch (error) {
    console.error('Error generating text with image URL:', error);
    throw error;
  }
};