"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveriesLogsController = void 0;
const zod_1 = require("zod");
const prisma_1 = require("../database/prisma");
const AppError_1 = require("../utils/AppError");
//Classe responsavel por criar o log de uma entrega
class DeliveriesLogsController {
    async create(request, response) {
        const bodySchema = zod_1.z.object({
            delivery_id: zod_1.z.string().uuid(),
            description: zod_1.z.string(),
        });
        const { delivery_id, description } = bodySchema.parse(request.body);
        const delivery = await prisma_1.prisma.delivery.findUnique({
            where: {
                id: delivery_id,
            },
        });
        if (!delivery) {
            throw new AppError_1.AppError("Entrega não encontrada", 404);
        }
        if (delivery.status === "delivered") {
            throw new AppError_1.AppError("Não é possível criar um novo log para entregas finalizadas", 400);
        }
        if (delivery.status === "processing") {
            throw new AppError_1.AppError("É necessário modificar o status para 'shipped' antes de criar um novo log", 400);
        }
        await prisma_1.prisma.deliveryLog.create({
            data: {
                deliveryId: delivery_id,
                description: description,
            },
        });
        return response.status(201).send();
    }
    async show(request, response) {
        const paramsSchema = zod_1.z.object({
            delivery_id: zod_1.z.string().uuid(),
        });
        const { delivery_id } = paramsSchema.parse(request.params);
        const delivery = await prisma_1.prisma.delivery.findUnique({
            where: {
                id: delivery_id,
            },
            //os logs que eu quero que apareçam 
            include: {
                logs: {
                    //quais campos do log eu quero que apareça
                    select: {
                        id: true,
                        description: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
            },
        });
        if (request.user?.role === "customer" &&
            request.user.id !== delivery?.userId) {
            throw new AppError_1.AppError("Você não tem permissão para visualizar esta entrega", 401);
        }
        return response.json(delivery);
    }
}
exports.DeliveriesLogsController = DeliveriesLogsController;
