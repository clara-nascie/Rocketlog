import express from "express";
import "express-async-errors"
import { errorHandling } from "./midllewares/error-handling";
import { router } from "./routes";

//essa constante serve para iniciar o express e configurar o que vai ser usado no projeto 
const app = express();

//aceita requisições em JSON
app.use(express.json());

//centralização das rotas
app.use(router)

// Middleware de tratamento de erros - deve ser o último a ser declarado
app.use(errorHandling);

export { app };
