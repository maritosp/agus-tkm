import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');

async function processImage(level) {
    const outputDir = path.join(projectRoot, 'public', 'images', `level${level}`);
    const inputPath = path.join(projectRoot, 'temp', `level${level}.jpg`);

    try {
        // Asegurarse de que el directorio existe
        await fs.mkdir(outputDir, { recursive: true });

        // Leer y procesar la imagen
        const image = sharp(inputPath);
        
        // Redimensionar a 600x600
        await image
            .resize(600, 600, {
                fit: 'cover',
                position: 'center'
            })
            .toFile(path.join(outputDir, 'full.jpg'));

        // Obtener las dimensiones
        const metadata = await image.metadata();
        const width = 600;
        const height = 600;
        const pieceWidth = Math.floor(width / 3);
        const pieceHeight = Math.floor(height / 3);

        // Generar las 9 piezas
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const pieceNum = row * 3 + col;
                const left = col * pieceWidth;
                const top = row * pieceHeight;

                await sharp(path.join(outputDir, 'full.jpg'))
                    .extract({
                        left,
                        top,
                        width: pieceWidth,
                        height: pieceHeight
                    })
                    .toFile(path.join(outputDir, `piece${pieceNum}.jpg`));
            }
        }

        console.log(`Level ${level} processed successfully!`);
    } catch (error) {
        console.error('Error processing image:', error);
    }
}

// Procesar el nivel 1
processImage(1); 