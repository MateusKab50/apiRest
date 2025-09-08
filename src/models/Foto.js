import Sequelize, { Model } from 'sequelize';
import appConfig from '../config/appConfig';

export default class Foto extends Model {//Aqui estamos a criar os nossos models
  static init(sequelize){
    super.init({
      originalname: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty:{
            msg: 'O nome original é obrigatório'
          }
        }
      },
      filename: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'O nome do arquivo é obrigatório'
          }
        }
      },

      url: {
        type: Sequelize.VIRTUAL,//Para criar um dado virtual no nosso model
        get(){
          return `${appConfig.url}/${this.getDataValue('filename')}`//Pega o valor do campo filename
        }
      },

    }, {
      sequelize,
      tableName: 'fotos', // Define the table name in the database
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Aluno, { foreignKey: 'aluno_id', as: 'aluno' });// Define the association with the Aluno model
    //.belongsTo: em uma relação quer dizer que pertence à ( Livros pentence a Atutores )
  }
}
