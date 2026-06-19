"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoutes = void 0;
const express_1 = require("express");
const users_controller_1 = require("../controllers/users-controller");
const usersRoutes = (0, express_1.Router)();
exports.usersRoutes = usersRoutes;
//o new é usado para instanciar a classe, pois ela foi criada 
//como construtor e não como função. 
// quando ela for criada como função, não precisamos usar o new para instanciar a classe.
const usersController = new users_controller_1.UsersController();
usersRoutes.post("/", usersController.create);
