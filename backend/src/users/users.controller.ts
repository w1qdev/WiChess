import { type Request, type Response } from 'express'
import { UserService } from './users.service.ts'
import { LoggerService } from '../utils/logger.service.ts'

export class UsersController {
    private userService: UserService
    private logger: LoggerService

    constructor(userService: UserService) {
        this.userService = userService
        this.logger = new LoggerService()
    }

    async getAllUsers(req: Request, res: Response) {
        try {
            const result = await this.userService.getAllUsers()

            this.logger.log(
                `Пользователи успешно получены: ${result.length} штук`
            )

            return res.status(200).json(result)
        } catch (error: unknown) {
            this.logger.error(
                error instanceof Error
                    ? error.message
                    : 'Ошибка при получении пользователей'
            )
            return res.status(500).json({ error: 'Внутренняя ошибка сервера' })
        }
    }
    async getUser(req: Request, res: Response) {
        try {
            const { email } = req.params

            const result = await this.userService.getUserByEmail(email)

            return res.status(200).json(result)
        } catch (error: unknown) {
            this.logger.error(
                error instanceof Error
                    ? error.message
                    : 'Ошибка при получении пользователя по email'
            )
            return res.status(500).json({ error: 'Внутренняя ошибка сервера' })
        }
    }

    // async removeUser(req: Request, res: Response) {
    //     try {
    //         const { email } = req.params

    //         const result = await this.userService.removeUser(email)
    //     } catch (error: unknown) {
    //         this.logger.error(
    //             error instanceof Error
    //                 ? error.message
    //                 : 'Ошибка при удалении пользователя'
    //         )
    //         return res.status(500).json({ error: 'Внутренняя ошибка сервера' })
    //     }
    // }
}
