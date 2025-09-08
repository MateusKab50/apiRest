"use strict";'use strict';

/** @type {import('sequelize-cli').Migration} */
const bcriptjs = require('bcryptjs');
module.exports = {
  async up (queryInterface) {
     await queryInterface.bulkInsert('users', //trata de adicionar varios dados de uma ver na tabela users como vez nos codigos abaixo
      [
        {
          nome: 'Mateus',
          email: 'mateus@teste.com',
          password_hash: await bcriptjs.hash('123456', 8),
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          nome: 'Mateus1',
          email: 'mateus1@teste.com',
          password_hash: await bcriptjs.hash('56789', 8),
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          nome: 'Mateus2',
          email: 'mateus2@teste.com',
          password_hash: await bcriptjs.hash('13579', 8),
          created_at: new Date(),
          updated_at: new Date()
        }
      ], {});
    
  },

  async down () {}
};
