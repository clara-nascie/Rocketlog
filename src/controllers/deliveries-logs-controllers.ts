import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";

//Classe responsavel por criar o log de uma entrega
class DeliveriesLogsController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      delivery_id: z.string().uuid(),
      description: z.string(),
    });

    const { delivery_id, description } = bodySchema.parse(request.body);

    const delivery = await prisma.delivery.findUnique({
      where: {
        id: delivery_id,
      },
    });

    if (!delivery) {
      throw new AppError("Entrega não encontrada", 404);
    }

    if (delivery.status === "processing") {
      throw new AppError(
        "É necessário modificar o status para 'shipped' antes de criar um novo log",
        400,
      );
    }

    await prisma.deliveryLog.create({
      data: {
        deliveryId: delivery_id,
        description: description,
      },
    });

    return response.status(201).send();
  }

  async show(request: Request, response: Response) {
    const paramsSchema = z.object({
      delivery_id: z.string().uuid(),
    });

    const { delivery_id } = paramsSchema.parse(request.params);

    const delivery = await prisma.delivery.findUnique({
      where: {
        id: delivery_id,
      },
    });

    if (request.user?.role === "customer" && request.user.id !== delivery?.userId) {
      throw new AppError("Você não tem permissão para visualizar esta entrega", 401);
    }

    return response.json(delivery);
  }
}

export { DeliveriesLogsController };
