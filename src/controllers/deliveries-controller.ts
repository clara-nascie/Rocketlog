import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { z } from "zod";

//classe Responsavel por cadastrar entregas
class DeliveriesController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      user_id: z.string().uuid(),
      description: z.string(),
    });

    const { user_id, description } = bodySchema.parse(request.body);

    //isso serve para garantir que o usuário existe antes de criar a entrega
    await prisma.delivery.create({
      data: {
        userId: user_id,
        description: description,
      },
    });

    return response.status(201).send();
  }

  //listar entregas
  async index(request: Request, response: Response) {
    const deliveries = await prisma.delivery.findMany({
      //inclui informações na response como name e email 
        include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return response.json(deliveries);
  }
}

export { DeliveriesController };
