"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
//arquivo de conxeão do banco de dados com o prisma 
const prisma_1 = require("../generated/prisma");
exports.prisma = new prisma_1.PrismaClient({
    //toda vez que houver uma consulta no banco de dados,
    //ele vai printar no console para facilitar o entendimento do código
    log: process.env.NODE_ENV === "production" ? [] : ["error"],
});
