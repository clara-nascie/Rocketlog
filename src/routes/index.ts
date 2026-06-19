//arquivo para centralizar todas as rotas 

import { Router } from "express";
import { usersRoutes } from "./users-routes";
import { sessionsRoutes } from "./sessions-routes";
import { deliveriesRoutes } from "./deliveries-routes";
import { deliveriesLogsRoutes } from "./delivery-logs-routes";

const router = Router();

//agrupamento de rotas de usuários, sessões, entregas e logs 
router.use("/users", usersRoutes);
router.use("/sessions", sessionsRoutes);
router.use("/deliveries", deliveriesRoutes);
router.use("/deliveries-logs", deliveriesLogsRoutes);

export { router };