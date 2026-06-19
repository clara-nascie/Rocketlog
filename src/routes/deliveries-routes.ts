import { Router } from "express";
import { DeliveriesController } from "@/controllers/deliveries-controller";
import { ensureAuthenticated } from "@/midllewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/midllewares/verivyUserAuthorization";
import { DeliveriesStatusController } from "@/controllers/deliveries-status-controlller";

//instanciando os controllers
const deliveriesRoutes = Router();
const deliveriesController = new DeliveriesController();
const deliveriesStatusController = new DeliveriesStatusController();

//aplicando middlewares nas rotas
deliveriesRoutes.use(ensureAuthenticated, verifyUserAuthorization(["seller"]))
deliveriesRoutes.post("/", deliveriesController.create)
deliveriesRoutes.get("/", deliveriesController.index)

//alterando o status de uma entrega
deliveriesRoutes.patch("/:id/status", deliveriesStatusController.update)

export { deliveriesRoutes };