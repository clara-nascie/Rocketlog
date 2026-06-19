"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const error_handling_1 = require("./midllewares/error-handling");
const routes_1 = require("./routes");
//essa constante serve para iniciar o express e configurar o que vai ser usado no projeto 
const app = (0, express_1.default)();
exports.app = app;
//aceita requisições em JSON
app.use(express_1.default.json());
//centralização das rotas
app.use(routes_1.router);
// Middleware de tratamento de erros - deve ser o último a ser declarado
app.use(error_handling_1.errorHandling);
