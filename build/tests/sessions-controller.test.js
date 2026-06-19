"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../app");
const prisma_1 = require("../database/prisma");
describe("SessionsController", () => {
    let user_id;
    afterAll(async () => {
        // Limpa o usuário criado após os testes
        await prisma_1.prisma.user.delete({
            where: {
                email: "test.session@example.com",
            },
        });
    });
    // teste de login com email e senha válidos
    it("should be able to authenticate with valid email and password", async () => {
        //criação de usuário com sucesso
        const userResponse = await (0, supertest_1.default)(app_1.app).post("/users").send({
            name: "Test User Session",
            email: "test.session@example.com",
            password: "password",
        });
        user_id = userResponse.body.id;
        //login com email e senha válidos
        const sessionResponse = await (0, supertest_1.default)(app_1.app).post("/sessions").send({
            email: "test.session@example.com",
            password: "password",
        });
        expect(sessionResponse.status).toBe(200);
        expect(sessionResponse.body.token).toEqual(expect.any(String));
    });
    // teste de erro se email não estiver cadastrado
    it("should not be able to authenticate with non-existent email", async () => {
        const response = await (0, supertest_1.default)(app_1.app).post("/sessions").send({
            email: "nonexistent@example.com",
            password: "password",
        });
        expect(response.status).toBe(401);
        expect(response.body.message).toBe("Usuário ou senha inválidos!");
    });
    // teste de erro se senha estiver incorreta
    it("should not be able to authenticate with invalid password", async () => {
        const response = await (0, supertest_1.default)(app_1.app).post("/sessions").send({
            email: "test.session@example.com",
            password: "wrong-password",
        });
        expect(response.status).toBe(401);
        expect(response.body.message).toBe("Usuário ou senha inválidos!");
    });
    // teste de validação de email
    it("should return an error if email is invalid", async () => {
        const response = await (0, supertest_1.default)(app_1.app).post("/sessions").send({
            email: "invalid-email",
            password: "password",
        });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Dados inválidos");
    });
});
