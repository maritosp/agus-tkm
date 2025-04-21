import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

export async function processImage(imageBuffer: Buffer, outputDir: string) {
  // Asegurarse de que la imagen sea cuadrada (600x600)
  const image = sharp(imageBuffer)
    .resize(600, 600, {
      fit: 'cover',
      position: 'center'
    });

  // Obtener las dimensiones de la imagen
  const metadata = await image.metadata();
  const width = metadata.width || 600;
  const height = metadata.height || 600;

  // Tamaño de cada pieza (3x3 grid)
  const pieceWidth = Math.floor(width / 3);
  const pieceHeight = Math.floor(height / 3);

  // Crear el directorio si no existe
  await fs.mkdir(outputDir, { recursive: true });

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
} 