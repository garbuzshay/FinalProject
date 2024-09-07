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
    const prompt = `You are generating a description for an artwork that will be displayed in a museum for visitors. The artwork is titled "${title}" and was created by the artist "${artist}" on ${createdDateByArtist} (please ensure the date is written in the exact format dd/mm/yy). 

Your task is to create a concise, informative, and engaging description of this artwork. Use the user's description "${description}" to capture the essence of the piece, focusing on its key elements such as the artistic style, subject matter, and significance. 

The description should be written with museum visitors in mind and should provide insight into the artwork, giving visitors a better understanding of it. Avoid any promotional or sales language, and focus solely on explaining and presenting the work in an impressive but factual manner. Make sure the description is easy to read and no longer than a few sentences while still capturing the most important aspects of the piece.`


    const result = await model.generateContent([prompt, imagePart]);
    return result.response.text();
  } catch (error) {
    console.error('Error generating text with image URL:', error);
    throw error;
  }
};