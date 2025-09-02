import Aluno from '../models/Aluno';
import Foto from '../models/Foto';

class AlunoController{//Controla todas ações que podem ser feitas na tabela aluno

  async index(req, res){
    try{

      const aluno = await Aluno.findAll({
        attributes: ['id', 'nome', 'email', 'idade', 'peso', 'altura'],// Specify the attributes you want to return
        //Ordenar os dados no nosso retorno de dados
        //    Pelo ID           Sel. Model
        order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
        include: {
          model: Foto,
          attributes: [
            'filename',
          ]
        }
      });

      return res.json(aluno);

    }catch(e){

      return res.status(400).json({ errors: e.errors.map(error => error.message)});

    }
  }

  async store(req, res){
    try{

      const aluno = await Aluno.create(req.body);

      return res.json(aluno);

    }catch(e){

      return res.status(400).json({ errors: e.errors.map(error => error.message)});

    }
  }

  async update(req, res){
    try{

      const { id } = req.params;

      if(!id){
        return res.status(400).json({ errors: ['Faltando ID'] });
      }

      const aluno = await Aluno.findByPk(id);

      if(!aluno){
        return res.status(400).json({ errors: ['Aluno não encontrado'] });
      }

      const alunoUpdate = await aluno.update(req.body);

      return res.json(alunoUpdate);

    }catch(e){

      return res.status(400).json({ errors: e.errors.map(error => error.message)});

    }
  }

  async show(req, res){
    try{

      const { id } = req.params;

      if(!id){
        return res.status(400).json({ errors: ['Faltando ID'] });
      }

      const aluno = await Aluno.findByPk(id, ({
        attributes: ['id', 'nome', 'email', 'idade', 'peso', 'altura'],// Specify the attributes you want to return
        //Ordenar os dados no nosso retorno de dados
        //    Pelo ID           Sel. Model
        order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
        include: {
          model: Foto,
          attributes: [
            'filename',
          ]
        }
      }));

      if(!aluno){
        return res.status(400).json({ errors: ['Aluno não encontrado'] });
      }

      return res.json(aluno);

    }catch(e){

      return res.status(400).json({ errors: e.errors.map(error => error.message)});

    }
  }

  async delete(req, res){
    try{

      const { id } = req.params;

      if(!id){
        return res.status(400).json({ errors: ['Faltando ID'] });
      }

      const aluno = await Aluno.findByPk(id);

      if(!aluno){
        return res.status(400).json({ errors: ['Aluno não encontrado'] });
      }

      await aluno.destroy();
      return res.json({ message: 'Aluno deletado com sucesso' });

    }catch(e){

      return res.status(400).json({ errors: e.errors.map(error => error.message)});

    }
  }
}

export default new AlunoController();
