"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandling = errorHandling;
const AppError_1 = require("../utils/AppError");
function errorHandling(error, request, response, next) {
    //estou fazendo isso para caso o erro seja uma instância de AppError, ou seja,
    //um erro lançado por mim como teste
    if (error instanceof AppError_1.AppError) {
        return response.status(error.statusCode).json({
            message: error.message,
        });
    }
    //Caso o erro não seja uma instância de AppError, vou retornar um erro genérico
    return response.status(500).json({
        message: error.message,
    });
}
