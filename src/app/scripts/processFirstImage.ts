import { processImage } from '../utils/imageProcessor';
import fs from 'fs/promises';
import path from 'path';

async function processFirstImage() {
  try {
    const inputPath = path.join(process.cwd(), 'public', 'images', 'level1', 'original.jpg');
    const outputDir = path.join(process.cwd(), 'public', 'images', 'level1');
    
    const imageBuffer = await fs.readFile(inputPath);
    await processImage(imageBuffer, outputDir);
    console.log('Image processed successfully!');
  } catch (error) {
    console.error('Error processing image:', error);
  }
}

processFirstImage(); 