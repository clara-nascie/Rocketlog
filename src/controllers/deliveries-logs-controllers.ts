import { Request, Response } from "express";

//Classe responsavel por criar o log de uma entrega
class DeliveriesLogsController {
    async create(request: Request, response: Response) {
        return response.json({ message: "Log criado com sucesso" })
    }
}

export { DeliveriesLogsController };