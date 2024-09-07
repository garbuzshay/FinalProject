// Backend/testGemini.js
import {
  generateText,
  generateTextWithImage,
  generateExhibitDescription
} from "./Services/GeminiService.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testGenerateText() {
  try {
    const prompt = "Write a story about an AI and magic";
    const result = await generateText(prompt);
    console.log("Generated Text:", result);
  } catch (error) {
    console.error("Error in generateText:", error);
  }
}

async function testGenerateArtworkDescription() {
  try {
    const prompt =
      "Write a 3-line description of an artwork similar to the Mona Lisa. Include when it was created, who created it, where it is displayed, and a brief explanation.";
    const result = await generateText(prompt);
    console.log("Generated Artwork Description:", result);
  } catch (error) {
    console.error("Error in generating artwork description:", error);
  }
}

async function testGenerateTextWithImage() {
  try {
    const prompt = "Provide a brief description about this artwork.";
    const imageUrl =
      "https://th-thumbnailer.cdn-si-edu.com/PS_-41itjP_RxxAKEquSm3e_MOg=/1072x720/filters:no_upscale()/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/Vincent-van-Gogh-Doctor-Gachet-631.jpg";
    const mimeType = "image/jpeg";

    // const result = await generateTextWithImage(prompt, imagePath, mimeType);
    const result = await generateTextWithImage(prompt, imageUrl);
    console.log("Generated Text with Image:", result);
  } catch (error) {
    console.error("Error in generating text with image:", error);
  }
}
async function testGenerateExhibitionDescription() {
  try {
    const promptData = {
      title: "The Chocolate Exhibition",
      description:
        "Explore the rich and decadent world of chocolate, from its ancient roots to modern-day delights, through interactive exhibits and live demonstrations."
    };

    const result = await generateExhibitDescription(promptData);
    console.log(result);
  } catch (error) {
    console.error("Error in generating exhibition description:", error);
  }
}

async function runTests() {
  // await testGenerateText();
  // await testGenerateTextWithImage();
  await testGenerateExhibitionDescription();
}

runTests();
