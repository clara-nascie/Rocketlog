import { Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { authConfig } from "../configs/auth";
import { prisma } from "../database/prisma";
import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";
import { z } from "zod";
class SessionsController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      email: z.string().email("Formato de email inválido"),
      password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    });

    const { email, password } = bodySchema.parse(request.body);

    const user = await prisma.user.findFirst({
      where: { email },
    });
    //caso nao haja nenhum ususário encontrado, lançar uma execessão
    if (!user) {
      throw new AppError("Usuário ou senha inválidos!", 401);
    }

    //comparar a senha fornecida com a senha armazenada
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Usuário ou senha inválidos!", 401);
    }
    const {secret, expiresIn} = authConfig.jwt;

    const token = sign({role: user.role ?? "customer"}, secret, {
      subject: user.id,
      expiresIn
    })

    const { password: _, ...userWithoutPassword } = user;
    return response.json({ message: "Login efetuado com sucesso", user: userWithoutPassword });
  }
}

export { SessionsController };
