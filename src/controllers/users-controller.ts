import { Request, Response } from "express";
import { z } from "zod"
import { hash } from "bcrypt"

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

        //colocando a senha em hash para segurança 
        const hashedPassword = await hash(password, 8);

        return response.json({
            message: "User created", hashedPassword
        })

    }
}

export { UsersController }