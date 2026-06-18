//arquivo para centralizar todas as rotas 

import { Router } from "express";
import { usersRoutes } from "./users-routes";
import { sessionsRoutes } from "./sessions-routes";

const router = Router();

router.use("/users", usersRoutes);
router.use("/sessions", sessionsRoutes);

export { router };