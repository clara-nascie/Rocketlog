"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = ensureAuthenticated;
const jsonwebtoken_1 = require("jsonwebtoken");
const auth_1 = require("../configs/auth");
const AppError_1 = require("../utils/AppError");
//Middleware para garantir que o usuário está autenticado e que o token é válido
function ensureAuthenticated(request, response, next) {
    try {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            throw new AppError_1.AppError("JWT Token não informado!");
        }
        //O token vem no formato: "Bearer <token>", então separamos a string 
        //e pegamos a segunda parte que é o token
        const [_, token] = authHeader.split(" ");
        //Verifica se o token é válido e pega as informações do payload
        const { role, sub: user_id } = (0, jsonwebtoken_1.verify)(token, auth_1.authConfig.jwt.secret);
        //Adiciona as informações do usuário ao objeto request
        request.user = {
            id: user_id,
            role
        };
        return next();
    }
    catch {
        throw new AppError_1.AppError("JWT Token inválido!", 401);
    }
}
