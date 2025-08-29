import multer from 'multer';
import multerConfig from '../config/multerConfig';

import Foto from '../models/Foto';

const upload = multer(multerConfig).single('arquivo');

class FotoController{
  store(req, res){
    return upload(req, res, async (err) => {
      if(err){
        return res.status(400).json({ errors: [err.code] });
      }

     try{

       const { originalname, filename } = req.file;

        const { aluno_id } = req.body;

        const foto = await Foto.create({
          originalname,
          filename,// Assuming aluno_id is passed in the request body
          aluno_id,
        });

        return res.json(foto);

     }catch(e){

      return res.status(400).json({
        errors: ['Aluno não existe']
      })

     }
    });

  }
}



export default new FotoController;
