"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

 class User extends _sequelize.Model {//Aqui estamos a criar os nossos models
  static init(sequelize){
    //Aqui estamos a inicializar o nosso model
    //super.init é o método que inicializa o model, e recebe dois parâmetros, o primeiro é um objeto com os atributos do model, e o segundo é um objeto com as opções do model.
    //O super.init chama o método init da classe Model, que é a classe base
    //O método init recebe dois parâmetros, o primeiro é um objeto com os atributos do model, e o segundo é um objeto com as opções do model.
    //O sequelize é o objeto que representa a conexão com o banco de dados, e é passado como parâmetro para o método init
    //O this é o objeto que representa a instância do model, e é usado para definir os atributos do model.
    //O this.addHook é um método que adiciona um hook ao model, que é um método que é executado antes ou depois de uma ação no model, como salvar ou atualizar um registro.
    //O this.addHook recebe dois parâmetros, o primeiro é o nome do hook,
    //e o segundo é uma função que é executada quando o hook é chamado. 
    super.init({
      nome: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'O campo deve conter entre 3 a 255 caracteres'
          }
        }
      },
      email: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        unique: {
          msg: 'Esse e-mail já existe'
        },
        validate: {
          isEmail: {
            msg: 'Email inválido'
          }
        }
      },
      password_hash: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
      },
      password: {
        type: _sequelize2.default.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'O campo deve conter entre 3 a 255 caracteres'
          }
        }
      },
    }, {
      sequelize,
    });

    this.addHook('beforeSave', async user => {
      if(user.password){
        user.password_hash = await _bcryptjs2.default.hash(user.password, 8);
      }
    });

    return this;
  }

  passwordIsValid(password){ //Método para validar a senha
    return _bcryptjs2.default.compare(password, this.password_hash); //para compara o hash com a senha do nosso usuário
  }
} exports.default = User;
