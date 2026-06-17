import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";


export function errorHandling(
    error: any,
    request: Request,
    response: Response,
    next: NextFunction 
) {

    //estou fazendo isso para caso o erro seja uma instância de AppError, ou seja,
    //um erro lançado por mim como teste
   if (error instanceof AppError) {
       return response.status(error.statusCode).json({
           message: error.message,
       })
   }

   //Caso o erro não seja uma instância de AppError, vou retornar um erro genérico
   return response.status(500).json({
       message: error.message,
   })
}