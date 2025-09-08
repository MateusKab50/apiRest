import User from '../models/User';
import jwt from 'jsonwebtoken';

/*
  1 - Receber email e senha 
  2 - Verificar se o usuário existe
  3 - Verificar se a senha está correta
  4 - Gerar um token JWT
  5 - Retornar o token 
 */

class TokenController{ //Aqui estamos a criar o nosso controller
  async store(req, res){//Aqui estamos a criar o método store, que é o método que vai receber os dados do usuário e retornar o token

    const { email = "", password = "" } = req.body;//Aqui estamos a desestruturar o email e a senha do corpo da requisição, e atribuindo um valor padrão vazio para evitar undefined

    if(!email || !password){
      return res.status(401).json({ errors: ['Credenciais inválidas'] });//Aqui estamos a verificar se o email ou a senha estão vazios, se estiverem, retornamos um erro 401
    }

    const user = await User.findOne({ where: { email } });//Aqui estamos a buscar o usuário no banco de dados pelo email

    if(!user){
      return res.status(400).json({ errors: ['Usuario não existe'] });//Aqui estamos a verificar se o usuário existe, se não existir, retornamos um erro 400
    }

    const { id } = user;//Aqui estamos a desestruturar o id do usuário
    const token = jwt.sign({id, email}, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION
});//Aqui estamos a gerar o token, o primeiro parâmetro é o payload, que é o objeto que vai ser codificado no token, o segundo parâmetro é a chave secreta, que é usada para assinar o token, e o terceiro parâmetro são as opções do token, como o tempo de expiração

    if(!(await user.passwordIsValid(password))){
      return res.status(401).json({ errors: ['Senha inválida'] }); 
    }//Aqui estamos a verificar se a senha está correta, se não estiver, retornamos um erro 401

    return res.json({ token, user: { nome: user.nome, id, email } });
  }
}

export default new TokenController();//Aqui estamos a exportar uma nova instância do TokenController
