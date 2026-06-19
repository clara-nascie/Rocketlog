import request from "supertest";
import { app } from "@/app";
import { prisma } from "@/database/prisma";
import { hash } from "bcrypt";

describe("SessionsController", () => {

    let user_id: string;

  afterAll(async () => {
    // Limpa o usuário criado após os testes
    await prisma.user.delete({
      where: {
        email: "test.session@example.com",
      },
    });
  });

  // teste de login com email e senha válidos
  it("should be able to authenticate with valid email and password", async () => {
    //criação de usuário com sucesso
    const userResponse = await request(app).post("/users").send({
      name: "Test User Session",
      email: "test.session@example.com",
      password: "password",
    });

    user_id = userResponse.body.id;

    //login com email e senha válidos
    const sessionResponse = await request(app).post("/sessions").send({
      email: "test.session@example.com",
      password: "password",
    });

    expect(sessionResponse.status).toBe(200);
    expect(sessionResponse.body.token).toEqual(expect.any(String));
  });

  // teste de erro se email não estiver cadastrado
  it("should not be able to authenticate with non-existent email", async () => {
    const response = await request(app).post("/sessions").send({
      email: "nonexistent@example.com",
      password: "password",
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Usuário ou senha inválidos!");
  });

  // teste de erro se senha estiver incorreta
  it("should not be able to authenticate with invalid password", async () => {
    const response = await request(app).post("/sessions").send({
      email: "test.session@example.com",
      password: "wrong-password",
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Usuário ou senha inválidos!");
  });

  // teste de validação de email
  it("should return an error if email is invalid", async () => {
    const response = await request(app).post("/sessions").send({
      email: "invalid-email",
      password: "password",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Dados inválidos");
  });
});
