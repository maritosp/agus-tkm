from PIL import Image
import os

def process_image(level):
    # Crear directorios si no existen
    output_dir = f'public/images/level{level}'
    os.makedirs(output_dir, exist_ok=True)
    
    # Abrir y redimensionar la imagen
    img = Image.open(f'temp/level{level}.jpg')
    img = img.resize((600, 600))
    
    # Dividir en 9 piezas (3x3)
    width, height = img.size
    piece_width = width // 3
    piece_height = height // 3
    
    for row in range(3):
        for col in range(3):
            piece_num = row * 3 + col
            left = col * piece_width
            top = row * piece_height
            right = left + piece_width
            bottom = top + piece_height
            
            piece = img.crop((left, top, right, bottom))
            piece.save(f'{output_dir}/piece{piece_num}.jpg', 'JPEG')
    
    print(f'Level {level} processed successfully!')

# Procesar el nivel 1
process_image(1) 