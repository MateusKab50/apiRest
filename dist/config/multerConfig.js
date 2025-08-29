"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);

var _path = require('path');

const aleatorio = () => Math.floor(Math.random() * 10000 + 1000);

exports. default = {
  fileFilter: (req, file, cb) => {
    if(file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png'){
      return cb(new _multer2.default.MulterError('Arquivo precisa ser uma imagem do tipo JPG, JPEG ou PNG'));
    }

    return cb(null, true);
  },
  storage: _multer2.default.diskStorage({// Define storage options
    destination: (req, file, cb) => {
      cb(null, _path.resolve.call(void 0, __dirname, '..', '..', 'uploads', 'image'));//Define o destino do arquivo
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${aleatorio()}${_path.extname.call(void 0, file.originalname)}`)//definne
    },
  })
}
