"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _appConfig = require('../config/appConfig'); var _appConfig2 = _interopRequireDefault(_appConfig);

 class Foto extends _sequelize.Model {//Aqui estamos a criar os nossos models
  static init(sequelize){
    super.init({
      originalname: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          notEmpty:{
            msg: 'O nome original é obrigatório'
          }
        }
      },
      filename: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'O nome do arquivo é obrigatório'
          }
        }
      },

      url: {
        type: _sequelize2.default.VIRTUAL,//Para criar um dado virtual no nosso model
        get(){
          return `${_appConfig2.default.url}/${this.getDataValue('filename')}`//Pega o valor do campo filename
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
  }
} exports.default = Foto;
