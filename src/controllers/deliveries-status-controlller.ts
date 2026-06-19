import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { DeliveryStatus } from "@/generated/prisma";
import z from "zod";

//classe responsavel por atualizar o status das entregas
class DeliveriesStatusController {
    async update(request: Request, response: Response) {
        //schema para validar o id que vem na url
        const paramSchema = z.object({
            id: z.string().uuid(),
        })

        //schema para validar o status que vem no corpo
        const bodySchema = z.object({
            status: z.enum(["processing", "shiped", "delivered"])
        })

        //validando e extraindo os dados
        const { id } = paramSchema.parse(request.params)
        const { status } = bodySchema.parse(request.body)

        await prisma.delivery.update({
            where: {
                id: id
            },
            data: {
                status: status
            }
        })

        //criando o lod de atualização de status
        await prisma.deliveryLog.create({
            data: {
                deliveryId: id,
                description: `Status atualizado para ${status}`
            }
        })

        return response.send();
    }
}

export { DeliveriesStatusController };