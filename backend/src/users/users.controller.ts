import { type Request, type Response } from 'express'
import { UserService } from './users.service.ts'

export class UsersController {
    private userService: UserService

    constructor(userService: UserService) {
        this.userService = userService
    }

    async getAllUsers(req: Request, res: Response) {
        try {
            const result = await this.userService.getAllUsers()

            return res.status(200).json(result)
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' })
        }
    }
    async findUser(req: Request, res: Response) {}
    async findUsers(req: Request, res: Response) {}
    async removeUser(req: Request, res: Response) {}
}
