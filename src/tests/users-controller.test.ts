import request from "supertest";
import { app } from "@/app";
import { prisma } from "@/database/prisma";

describe("UsersController", () => {
  let user_id: string;

  afterAll(async () => {
    if (user_id) {
      await prisma.user.delete({
        where: {
          id: user_id,
        },
      });
    }
  });

  //criação de usuário com sucesso e cadastro no banco de dados
  it("should create a new user successfully", async () => {
    const response = await request(app).post("/users").send({
      name: "Test User",
      email: "testuser@example.com",
      password: "password",
    });

    user_id = response.body.id;

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Test User");
  });

  //validação de email/usuário repetido
  it('should throw an error if the user already exists', async () => {
     const response = await request(app).post("/users").send({
      name: "Duplicate User",
      email: "testuser@example.com",
      password: "password",
    });

    expect(response.status).toBe(400)
    expect(response.body.message).toBe("User already exists")
  })

//validação de email
  it("should throw an error if email is invalid", async () => {
    const response = await request(app).post("/users").send({
      name: "Test User",
      email: "invalid-email",
      password: "password123",
    });

    expect(response.status).toBe(400)
    expect(response.body.message).toBe("Dados inválidos")
  })
});
