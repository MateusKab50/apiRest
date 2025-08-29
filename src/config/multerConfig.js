import multer from 'multer';

import { extname, resolve } from 'path';

const aleatorio = () => Math.floor(Math.random() * 10000 + 1000);

export default {
  fileFilter: (req, file, cb) => {
    if(file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png'){
      return cb(new multer.MulterError('Arquivo precisa ser uma imagem do tipo JPG, JPEG ou PNG'));
    }

    return cb(null, true);
  },
  storage: multer.diskStorage({// Define storage options
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, '..', '..', 'uploads', 'image'));//Define o destino do arquivo
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${aleatorio()}${extname(file.originalname)}`)//definne
    },
  })
}
