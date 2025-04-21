import sharp from 'sharp';
import path from 'path';

async function processImage(level: number) {
  try {
    const outputDir = path.join(process.cwd(), 'public', 'images', `level${level}`);
    
    // Procesar la imagen
    const image = sharp(path.join(process.cwd(), 'temp', `level${level}.jpg`))
      .resize(600, 600, {
        fit: 'cover',
        position: 'center'
      });

    // Obtener dimensiones
    const metadata = await image.metadata();
    const width = metadata.width || 600;
    const height = metadata.height || 600;

    // Tamaño de cada pieza (3x3 grid)
    const pieceWidth = Math.floor(width / 3);
    const pieceHeight = Math.floor(height / 3);

    // Generar las 9 piezas
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const pieceNumber = row * 3 + col;
        const x = col * pieceWidth;
        const y = row * pieceHeight;

        await image
          .clone()
          .extract({
            left: x,
            top: y,
            width: pieceWidth,
            height: pieceHeight
          })
          .toFile(path.join(outputDir, `piece${pieceNumber}.jpg`));
      }
    }

    console.log(`Level ${level} image processed successfully!`);
  } catch (error) {
    console.error('Error processing image:', error);
  }
}

// Procesar el nivel 1
processImage(1); 