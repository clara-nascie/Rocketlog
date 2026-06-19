"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../database/prisma");
const prisma_2 = require("@/generated/prisma");
const zod_1 = __importDefault(require("zod"));
//classe responsavel por atualizar o status das entregas
class DeliveriesStatusController {
    async update(request, response) {
        const bodySchema = zod_1.default.object({
            id: zod_1.default.string().uuid(),
            status: zod_1.default.nativeEnum(prisma_2.DeliveryStatus)
        });
        const { id, status } = bodySchema.parse(request.body);
        await prisma_1.prisma.delivery.update({
            where: {
                id: id
            },
            data: {
                status: status
            }
        });
        return response.send();
    }
}
