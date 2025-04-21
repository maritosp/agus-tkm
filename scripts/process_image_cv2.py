import cv2
import numpy as np
import os

def process_image(level):
    # Crear directorio si no existe
    output_dir = f'public/images/level{level}'
    os.makedirs(output_dir, exist_ok=True)
    
    # Leer la imagen
    img = cv2.imread(f'temp/level{level}.jpg')
    
    # Redimensionar a 600x600
    img = cv2.resize(img, (600, 600))
    
    # Dividir en 9 piezas (3x3)
    height, width = img.shape[:2]
    piece_height = height // 3
    piece_width = width // 3
    
    for i in range(3):
        for j in range(3):
            piece_num = i * 3 + j
            start_y = i * piece_height
            start_x = j * piece_width
            piece = img[start_y:start_y + piece_height, start_x:start_x + piece_width]
            cv2.imwrite(f'{output_dir}/piece{piece_num}.jpg', piece)
    
    print(f'Level {level} processed successfully!')

if __name__ == '__main__':
    process_image(1) 