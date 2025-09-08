import dotenv from 'dotenv';

dotenv.config();

import './database';

import { resolve } from 'path';

import express from 'express';//ola
import cors from 'cors';
import helmet from 'helmet';

import homeRoutes from './routes/homeRoutes';
import userRoutes from './routes/userRoutes';
import tokenRoutes from './routes/tokenRoutes';
import alunoRoutes from './routes/alunoRoutes';
import fotoRoutes from './routes/fotoRoutes';

const whiteList = [
  'http://localhost:3001',
  'http://localhost:3000'
];

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
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares(){//Middlewares são funções que são executadas antes das rotas
    this.app.use(cors(corsOption));// Habilita o CORS para permitir requisições de diferentes origens;
    this.app.use(helmet());// Protege a aplicação de algumas vulnerabilidades conhecidas;
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use('/images/', express.static(resolve(__dirname, '..', 'uploads')));
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
