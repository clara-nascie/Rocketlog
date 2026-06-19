"use strict";
//esse arquivo serve para configurar o jwt e guardar em um local seguro 
//o segredo do jwt, é uma string aleatória que será usada para gerar o token
Object.defineProperty(exports, "__esModule", { value: true });
exports.authConfig = void 0;
const env_1 = require("../env");
exports.authConfig = {
    jwt: {
        secret: env_1.env.JWT_SECRET,
        expiresIn: "1d",
    }
};
