import Sequelize, { Model } from 'sequelize';

export default class Aluno extends Model {//Aqui estamos a criar os nossos models
  static init(sequelize){
    super.init({
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'O nome deve conter entre 3 a 255 caracteres'
          }
        }
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          isEmail: {
            msg: 'E-mail inválido'
          }
        }
      },
      idade: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        validate: {
          isInt: {
            msg: 'A idade deve ser umm número inteiro'
          }
        }
      },
      peso: {
        type: Sequelize.FLOAT,
        defaultValue: '',
        validate: {
          isFloat: {
            msg: 'O peso deve ser um número inteiro ou de ponto flutuante'
          }
        }
      },
      altura: {
        type: Sequelize.FLOAT,
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
}
