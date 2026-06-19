"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const prisma_1 = require("../database/prisma");
const zod_1 = require("zod");
const bcrypt_1 = require("bcrypt");
const AppError_1 = require("../utils/AppError");
//definindo a regra do corpo da requisição
const createUserSchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
class UsersController {
    async create(request, response) {
        const bodySchema = zod_1.z.object({
            name: zod_1.z.string().trim().min(3),
            email: zod_1.z.string().email().trim(),
            password: zod_1.z.string().trim().min(6),
        });
        //desestruturando os dados do request.body
        const { name, email, password } = bodySchema.parse(request.body);
        //verificando se o email já existe
        const userWithSameEmail = await prisma_1.prisma.user.findFirst({
            where: { email },
        });
        if (userWithSameEmail) {
            throw new AppError_1.AppError("User already exists");
        }
        //colocando a senha em hash para segurança 
        const hashedPassword = await (0, bcrypt_1.hash)(password, 8);
        const user = await prisma_1.prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        //para nao retornar a senha na resposta 
        const { password: _, ...userWithoutPassword } = user;
        return response.status(201).json(userWithoutPassword);
    }
}
exports.UsersController = UsersController;
