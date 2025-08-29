import Sequelize  from "sequelize";
import databaseConfig from '../config/database';
import Aluno from '../models/Aluno';
import User from '../models/User';
import Foto from '../models/Foto';

const models = [Aluno, Foto , User];

const conn = new Sequelize(databaseConfig);// Cria a conexão com o banco de dados
models.forEach( model => model.init(conn));// Inicializa os modelos com a conexão
models.forEach( model => model.associate && model.associate(conn.models));// Associações entre modelos

