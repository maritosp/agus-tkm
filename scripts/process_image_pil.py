from PIL import Image
import os

def process_image(level):
    # Asegurarse de que el directorio existe
    output_dir = f'public/images/level{level}'
    os.makedirs(output_dir, exist_ok=True)

    try:
        # Abrir y redimensionar la imagen
        with Image.open(f'temp/level{level}.jpg') as img:
            # Convertir a RGB si es necesario
            if img.mode != 'RGB':
                img = img.convert('RGB')
            
            # Redimensionar a 600x600
            img = img.resize((600, 600))
            
            # Obtener dimensiones
            width, height = img.size
            piece_width = width // 3
            piece_height = height // 3
            
            # Dividir en 9 piezas
            for i in range(3):
                for j in range(3):
                    piece_num = i * 3 + j
                    left = j * piece_width
                    top = i * piece_height
                    right = left + piece_width
                    bottom = top + piece_height
                    
                    # Recortar y guardar la pieza
                    piece = img.crop((left, top, right, bottom))
                    piece.save(f'{output_dir}/piece{piece_num}.jpg', 'JPEG')
            
            print(f'Level {level} processed successfully!')
    except Exception as e:
        print(f'Error processing image: {e}') 