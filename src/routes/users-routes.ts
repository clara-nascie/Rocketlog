import { Router } from "express";
import { UsersController } from "@/controllers/users-controller";

const usersRoutes = Router()

//o new é usado para instanciar a classe, pois ela foi criada 
//como construtor e não como função. 

// quando ela for criada como função, não precisamos usar o new para instanciar a classe.
const usersController = new UsersController()

usersRoutes.post("/", usersController.create);


export { usersRoutes };
