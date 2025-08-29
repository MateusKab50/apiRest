"use strict";'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {//Estamos a criar os campos necessarios para a inserção dos nossos atributos
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('fotos', {
      id: {
        type: Sequelize.INTEGER, //Tipo de dado
        allowNull: false, //Não pode ser Null
        autoIncrement: true, //Auto incrementado
        primaryKey: true //Chave Primaria
      },

      originalname: {
        type: Sequelize.STRING,
        allowNull: false
      },

      filename: {
        type: Sequelize.STRING,
        allowNull: false
      },

      aluno_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'alunos', //Nome da tabela referenciada
          key: 'id' //Chave Primaria da tabela referenciada
        },
        onDelete: 'SET NULL', //O que acontece quando o aluno for deletado // cascade significa que se o aluno for deletado, as fotos também serão deletadas
        onUpdate: 'CASCADE'
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
    return queryInterface.createTable('fotos');
  }
};