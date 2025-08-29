'use strict';

//const { Sequelize } = require('sequelize');

//Executar no terminal: //! npx sequelize db:migration

/** @type {import('sequelize-cli').Migration} */
module.exports = {//Estamos a criar os campos necessarios para a inserção dos nossos atributos
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER, //Tipo de dado
        allowNull: false, //Não pode ser Null
        autoIncrement: true, //Auto incrementado
        primaryKey: true //Chave Primaria
      },

      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },

      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down (queryInterface) {
    return queryInterface.createTable('users');
  }
};
