"use strict";
//arquivo para centralizar todas as rotas 
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const users_routes_1 = require("./users-routes");
const sessions_routes_1 = require("./sessions-routes");
const deliveries_routes_1 = require("./deliveries-routes");
const router = (0, express_1.Router)();
exports.router = router;
router.use("/users", users_routes_1.usersRoutes);
router.use("/sessions", sessions_routes_1.sessionsRoutes);
router.use("/deliveries", deliveries_routes_1.deliveriesRoutes);
