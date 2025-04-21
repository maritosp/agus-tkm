const sharp = require('sharp');
const path = require('path');

// Procesar la imagen
sharp('temp/level1.jpg')
  .resize(600, 600, {
    fit: 'cover',
    position: 'center'
  })
  .toFile('public/images/level1/full.jpg')
  .then(() => {
    console.log('Image processed successfully!');
  })
  .catch(err => {
    console.error('Error processing image:', err);
  }); 