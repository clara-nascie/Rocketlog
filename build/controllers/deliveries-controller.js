"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveriesController = void 0;
const prisma_1 = require("../database/prisma");
const zod_1 = require("zod");
//classe Responsavel por cadastrar entregas
class DeliveriesController {
    async create(request, response) {
        const bodySchema = zod_1.z.object({
            user_id: zod_1.z.string().uuid(),
            description: zod_1.z.string(),
        });
        const { user_id, description } = bodySchema.parse(request.body);
        //isso serve para garantir que o usuário existe antes de criar a entrega
        await prisma_1.prisma.delivery.create({
            data: {
                userId: user_id,
                description: description,
            },
        });
        return response.status(201).send();
    }
    //listar entregas
    async index(request, response) {
        const deliveries = await prisma_1.prisma.delivery.findMany({
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
exports.DeliveriesController = DeliveriesController;
