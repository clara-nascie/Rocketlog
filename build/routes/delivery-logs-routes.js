"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deliveriesLogsRoutes = void 0;
const express_1 = require("express");
const deliveries_logs_controllers_1 = require("../controllers/deliveries-logs-controllers");
const ensure_authenticated_1 = require("../midllewares/ensure-authenticated");
const verivyUserAuthorization_1 = require("../midllewares/verivyUserAuthorization");
//instanciando os controllers
const deliveriesLogsRoutes = (0, express_1.Router)();
exports.deliveriesLogsRoutes = deliveriesLogsRoutes;
const deliveriesLogsController = new deliveries_logs_controllers_1.DeliveriesLogsController();
//criando rota de log de entregas
deliveriesLogsRoutes.post("/", ensure_authenticated_1.ensureAuthenticated, (0, verivyUserAuthorization_1.verifyUserAuthorization)(["seller"]), deliveriesLogsController.create);
//rota para buscar logs
deliveriesLogsRoutes.get("/:delivery_id/show", ensure_authenticated_1.ensureAuthenticated, (0, verivyUserAuthorization_1.verifyUserAuthorization)(["seller", "customer"]), deliveriesLogsController.show);
