"use strict";
//arquivo para centralizar todas as rotas 
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const users_routes_1 = require("./users-routes");
const sessions_routes_1 = require("./sessions-routes");
const deliveries_routes_1 = require("./deliveries-routes");
const delivery_logs_routes_1 = require("./delivery-logs-routes");
const router = (0, express_1.Router)();
exports.router = router;
//agrupamento de rotas de usuários, sessões, entregas e logs 
router.use("/users", users_routes_1.usersRoutes);
router.use("/sessions", sessions_routes_1.sessionsRoutes);
router.use("/deliveries", deliveries_routes_1.deliveriesRoutes);
router.use("/deliveries-logs", delivery_logs_routes_1.deliveriesLogsRoutes);
