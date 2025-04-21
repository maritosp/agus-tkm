import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');

async function saveImage(level) {
    const outputDir = path.join(projectRoot, 'public', 'images', `level${level}`);
    const inputPath = path.join(projectRoot, 'temp', `level${level}.jpg`);

    try {
        // Asegurarse de que el directorio existe
        await fs.mkdir(outputDir, { recursive: true });

        // Procesar y guardar la imagen
        await sharp(inputPath)
            .resize(600, 600, {
                fit: 'cover',
                position: 'center'
            })
            .toFile(path.join(outputDir, 'full.jpg'));

        console.log(`Image for level ${level} saved successfully!`);
    } catch (error) {
        console.error('Error saving image:', error);
    }
}

// Guardar la imagen del nivel 1
saveImage(1); 