import jwt from 'jsonwebtoken';
import User from '../models/User'

export default async (req, res, next) => {
  const { authorization } = req.headers; // Aqui estamos a pegar o cabeçalho de autorização da requisição.;

  console.log(req.headers);

  if(!authorization){
    return res.status(401).json({ errors: ['login required'] });
  }

  const [, token] = authorization.split(' ');// Aqui estamos a desestruturar o token do cabeçalho de autorização, separando o tipo de token (Bearer) e o próprio token.

  try{
    const dados = jwt.verify(token, process.env.TOKEN_SECRET); // 
    const { id, email } = dados;

    const user = await User.findOne({ where: {id, email}});// Aqui estamos a buscar o usuário no banco de dados pelo id e email que foram decodificados do token.

    if(!user){
      return res.status(401).json({errors: ['Usuário invalido']});// Se o usuário não existir, retornamos um erro 401.
    }

    req.userId = id;
    req.userEmail = email;
    return next();
  }catch(e){
    console.log(e);
    return res.status(401).json({ errors: ['Token inválido ou expirado'] });
  }
}
