//arquivo para centralizar todas as rotas 

import { Router } from "express";
import { usersRoutes } from "./users-routes";

const router = Router();

router.use("/users", usersRoutes);

export { router };