import { Request, Response } from "express";

class UsersController {

    async create (request: Request, response: Response) {
        return response.json({
            message: "User created",
        })

    }
}

export { UsersController }