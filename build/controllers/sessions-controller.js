"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionsController = void 0;
const AppError_1 = require("../utils/AppError");
const auth_1 = require("../configs/auth");
const prisma_1 = require("../database/prisma");
const jsonwebtoken_1 = require("jsonwebtoken");
const bcrypt_1 = require("bcrypt");
const zod_1 = require("zod");
class SessionsController {
    async create(request, response) {
        const bodySchema = zod_1.z.object({
            email: zod_1.z.string().email("Formato de email inválido"),
            password: zod_1.z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
        });
        const { email, password } = bodySchema.parse(request.body);
        const user = await prisma_1.prisma.user.findFirst({
            where: { email },
        });
        //caso nao haja nenhum ususário encontrado, lançar uma execessão
        if (!user) {
            throw new AppError_1.AppError("Usuário ou senha inválidos!", 401);
        }
        //comparar a senha fornecida com a senha armazenada
        const passwordMatch = await (0, bcrypt_1.compare)(password, user.password);
        if (!passwordMatch) {
            throw new AppError_1.AppError("Usuário ou senha inválidos!", 401);
        }
        const { secret, expiresIn } = auth_1.authConfig.jwt;
        const token = (0, jsonwebtoken_1.sign)({ role: user.role ?? "customer" }, secret, {
            subject: user.id,
            expiresIn,
        });
        const { password: _, ...userWithoutPassword } = user;
        return response.json({ token, user: userWithoutPassword });
    }
}
exports.SessionsController = SessionsController;
