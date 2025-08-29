"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class Aluno extends _sequelize.Model {//Aqui estamos a criar os nossos models
  static init(sequelize){
    super.init({
      nome: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'O nome deve conter entre 3 a 255 caracteres'
          }
        }
      },
      email: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          isEmail: {
            msg: 'E-mail inválido'
          }
        }
      },
      idade: {
        type: _sequelize2.default.INTEGER,
        defaultValue: '',
        validate: {
          isInt: {
            msg: 'A idade deve ser umm número inteiro'
          }
        }
      },
      peso: {
        type: _sequelize2.default.FLOAT,
        defaultValue: '',
        validate: {
          isFloat: {
            msg: 'O peso deve ser um número inteiro ou de ponto flutuante'
          }
        }
      },
      altura: {
        type: _sequelize2.default.FLOAT,
        defaultValue: '',
        validate: {
          isFloat: {
            msg: 'A alutura deve ser um número inteiro ou de ponto flutuante'
          }
        }
      }
    }, {
      sequelize,
    });

    return this;
  }

  static associate(models){
    this.hasMany(models.Foto, { foreignkey: 'aluno_id' })
  }
} exports.default = Aluno;
