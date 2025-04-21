import fs from 'fs/promises';
import path from 'path';

async function saveImage(base64Image: string, outputPath: string) {
  try {
    // Remove the data URL prefix if present
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
    
    // Create buffer from base64
    const imageBuffer = Buffer.from(base64Data, 'base64');
    
    // Ensure directory exists
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    
    // Write file
    await fs.writeFile(outputPath, imageBuffer);
    console.log('Image saved successfully!');
  } catch (error) {
    console.error('Error saving image:', error);
  }
}

// Example usage:
// saveImage('base64string...', 'public/images/level1/original.jpg'); 