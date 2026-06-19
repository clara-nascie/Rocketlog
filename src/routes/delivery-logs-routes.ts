import { Router } from "express";
import { DeliveriesLogsController } from "@/controllers/deliveries-logs-controllers";
import { ensureAuthenticated } from "@/midllewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/midllewares/verivyUserAuthorization";

//instanciando os controllers
const deliveriesLogsRoutes = Router();
const deliveriesLogsController = new DeliveriesLogsController();

//criando rota de log de entregas
deliveriesLogsRoutes.post("/",
    ensureAuthenticated,
    verifyUserAuthorization(["seller"]),
    deliveriesLogsController.create)

export { deliveriesLogsRoutes };