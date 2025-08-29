"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class UserController{
  async store(req, res){
    try{
          const novoUser = await _User2.default.create(req.body);
          res.json(novoUser);
      }catch(e){
        res.status(400).json({errors: e.errors.map(err => err.message)});
    }

  }


  //index
  async index(req, res){
    try{
      const user = await _User2.default.findAll()
      return res.json(user);
    }catch(e){
      return res.json(null);
    }
  }

  //Show
  async show(req, res){
    try{
      const { id } = req.params
      const user = await _User2.default.findByPk(id);
      return res.json(user);
    }catch(e){
      return res.json(null);
    }
  }


  //update
   async update(req, res){
    try{
      
      const user = await _User2.default.findByPk(req.userId);

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
      const user = await _User2.default.findByPk(req.userId);

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

exports. default = new UserController();
