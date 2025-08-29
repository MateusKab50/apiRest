import dotenv from 'dotenv';

dotenv.config();

import './src/database';

import { resolve } from 'path';

import express from 'express';
import homeRoutes from './src/routes/homeRoutes';
import userRoutes from './src/routes/userRoutes';
import tokenRoutes from './src/routes/tokenRoutes';
import alunoRoutes from './src/routes/alunoRoutes';
import fotoRoutes from './src/routes/fotoRoutes';

class App {
  constructor(){
    this.app = express();// Cria uma instância do express;
    this.middlewares();// Configura os middlewares que serão usados na aplicação;
    this.routes(); // Configura as rotas que serão usadas na aplicação;
  }

  middlewares(){
    this.app.use(express.urlencoded({ extended: true }));// Permite receber dados do formulário no body da requisição;
    this.app.use(express.json());// Permite receber JSON no body da requisição;
    this.app.use(express.static(resolve(__dirname, 'uploads')));// Serve para arquivos estáticos;
  }

  routes(){
    this.app.use('/', homeRoutes);
    this.app.use('/users/', userRoutes);
    this.app.use('/tokens/', tokenRoutes);
    this.app.use('/alunos/', alunoRoutes);
    this.app.use('/fotos/', fotoRoutes);
  }
}


export default new App().app;
