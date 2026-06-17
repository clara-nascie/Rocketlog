import express from "express";
import "express-async-errors"
import { errorHandling } from "./midllewares/error-handling";

const app = express();
app.use(express.json());

// Middleware de tratamento de erros - deve ser o último a ser declarado
app.use(errorHandling);

export { app };
