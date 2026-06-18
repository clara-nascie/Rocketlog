//arquivo de conxeão do banco de dados com o prisma 
import { PrismaClient } from "../generated/prisma";


export const prisma = new PrismaClient({
    //toda vez que houver uma consulta no banco de dados,
    //ele vai printar no console para facilitar o entendimento do código
    log: process.env.NODE_ENV === "production" ? [] : ["error"],
});