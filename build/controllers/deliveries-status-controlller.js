"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveriesStatusController = void 0;
const prisma_1 = require("../database/prisma");
const zod_1 = __importDefault(require("zod"));
//classe responsavel por atualizar o status das entregas
class DeliveriesStatusController {
    async update(request, response) {
        //schema para validar o id que vem na url
        const paramSchema = zod_1.default.object({
            id: zod_1.default.string().uuid(),
        });
        //schema para validar o status que vem no corpo
        const bodySchema = zod_1.default.object({
            status: zod_1.default.enum(["processing", "shiped", "delivered"])
        });
        //validando e extraindo os dados
        const { id } = paramSchema.parse(request.params);
        const { status } = bodySchema.parse(request.body);
        await prisma_1.prisma.delivery.update({
            where: {
                id: id
            },
            data: {
                status: status
            }
        });
        //criando o lod de atualização de status
        await prisma_1.prisma.deliveryLog.create({
            data: {
                deliveryId: id,
                description: `Status atualizado para ${status}`
            }
        });
        return response.send();
    }
}
exports.DeliveriesStatusController = DeliveriesStatusController;
