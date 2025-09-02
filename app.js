import dotenv from 'dotenv';

dotenv.config();

import './src/database';

import { resolve } from 'path';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';


import homeRoutes from './src/routes/homeRoutes';
import userRoutes from './src/routes/userRoutes';
import tokenRoutes from './src/routes/tokenRoutes';
import alunoRoutes from './src/routes/alunoRoutes';
import fotoRoutes from './src/routes/fotoRoutes';

const whiteList = [
  'http://localhost:3000'
]

const corsOption = {
  origin: function(origin, callback){
    if(whiteList.indexOf(origin) !== -1 || !origin){
      callback(null, true);
    } else {
      callback(new Error('Não permitido pelo CORS'));
    }
  }
}

class App {
  constructor(){
    this.app = express();// Cria uma instância do express;
    this.middlewares();// Configura os middlewares que serão usados na aplicação;
    this.routes(); // Configura as rotas que serão usadas na aplicação;
  }

  middlewares(){
    this.app.use(cors(corsOption));// Habilita o CORS para permitir requisições de diferentes origens;
    this.app.use(helmet());// Protege a aplicação de algumas vulnerabilidades conhecidas;
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
