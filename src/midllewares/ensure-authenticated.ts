import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { authConfig } from "../configs/auth";
import { AppError } from "../utils/AppError";

//Essa interface serve para tipar o payload do token, ou seja, 
//as informações que serão armazenadas no token
interface IPayload {
    sub: string;
    role: string;
}

//Middleware para garantir que o usuário está autenticado e que o token é válido
function ensureAuthenticated(request: Request, response: Response, next: NextFunction){
    try{
        const authHeader = request.headers.authorization;
        if(!authHeader){
            throw new AppError("JWT Token não informado!");
        }
        //O token vem no formato: "Bearer <token>", então separamos a string 
        //e pegamos a segunda parte que é o token
        const [_, token] = authHeader.split(" ");

        //Verifica se o token é válido e pega as informações do payload
        const {role, sub: user_id} = verify(token, authConfig.jwt.secret) as IPayload;

        //Adiciona as informações do usuário ao objeto request
        request.user = {
            id: user_id,
            role
        };
        
        return next();
        
    }catch{
        throw new AppError("JWT Token inválido!", 401);
    }
}

export{ ensureAuthenticated };