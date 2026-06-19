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
});
