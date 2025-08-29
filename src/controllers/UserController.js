import User from '../models/User';

class UserController{
  async store(req, res){
    try{
          const novoUser = await User.create(req.body);
          res.json(novoUser);
      }catch(e){
        res.status(400).json({errors: e.errors.map(err => err.message)});
    }

  }


  //index
  async index(req, res){
    try{
      const user = await User.findAll()
      return res.json(user);
    }catch(e){
      return res.json(null);
    }
  }

  //Show
  async show(req, res){
    try{
      const { id } = req.params
      const user = await User.findByPk(id);
      return res.json(user);
    }catch(e){
      return res.json(null);
    }
  }


  //update
   async update(req, res){
    try{
      
      const user = await User.findByPk(req.userId);

      if(!user){
        return res.status(400).json({
          errors: ['USUARIO NÃO ENCONTRADO']
        });
      }

      const novoUser = await user.update(req.body);
      return res.json(novoUser);
    }catch(e){
      console.log(e);
      return res.json(null);
    }
  }

  //Delete
  async delete(req, res){
    try{
      const user = await User.findByPk(req.userId);

      if(!user){
        return res.status(400).json({
          errors: ['USUARIO NÃO ENCONTRADO']
        });
      }

      await user.destroy();//Para eliminar um dado...
      return res.json(`${user.nome} elimidado com sucesso`);
    }catch(e){
      console.log(e);
      return res.json(null);
    }
  }
}

export default new UserController();
