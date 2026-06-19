"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deliveriesRoutes = void 0;
const express_1 = require("express");
const deliveries_controller_1 = require("../controllers/deliveries-controller");
const ensure_authenticated_1 = require("../midllewares/ensure-authenticated");
const verivyUserAuthorization_1 = require("../midllewares/verivyUserAuthorization");
const deliveries_status_controlller_1 = require("../controllers/deliveries-status-controlller");
//instanciando os controllers
const deliveriesRoutes = (0, express_1.Router)();
exports.deliveriesRoutes = deliveriesRoutes;
const deliveriesController = new deliveries_controller_1.DeliveriesController();
const deliveriesStatusController = new deliveries_status_controlller_1.DeliveriesStatusController();
//aplicando middlewares nas rotas
deliveriesRoutes.use(ensure_authenticated_1.ensureAuthenticated, (0, verivyUserAuthorization_1.verifyUserAuthorization)(["seller"]));
deliveriesRoutes.post("/", deliveriesController.create);
deliveriesRoutes.get("/", deliveriesController.index);
//alterando o status de uma entrega
deliveriesRoutes.patch("/:id/status", deliveriesStatusController.update);
