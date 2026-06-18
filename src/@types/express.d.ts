//preciso fazer a typagem do express pq o middleware garante que o usuário está logado
//então eu posso adicionar as propriedades id e role ao objeto request

declare namespace Express {
  export interface Request {
    user?: {
      id: string;
      role: string;
    };
  }
}
