import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import { z } from "zod"
import { hash } from "bcrypt"
import { AppError } from "../utils/AppError";

//definindo a regra do corpo da requisição
const createUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
})

class UsersController {

    async create(request: Request, response: Response) {
        const bodySchema = z.object({
            name: z.string().trim().min(3),
            email: z.string().email().trim(),
            password: z.string().trim().min(6),
        })
        //desestruturando os dados do request.body
        const { name, email, password } = bodySchema.parse(request.body);

        //verificando se o email já existe
        const userWithSameEmail = await prisma.user.findFirst({
            where: { email },
        });
        if (userWithSameEmail) {
            throw new AppError("User already exists");
        }

        //colocando a senha em hash para segurança 
        const hashedPassword = await hash(password, 8);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        })

        //para nao retornar a senha na resposta 
        const { password: _, ...userWithoutPassword } = user;

        return response.status(201).json(userWithoutPassword);

    }
}

export { UsersController }