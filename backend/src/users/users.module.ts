import { Router } from 'express'
import { UsersController } from './users.controller.ts'
import { UserService } from './users.service.ts'
import { jwtMiddleware } from '../middlewares/jwt.middleware.ts'

export default function UserModule(): Router {
    const router = Router()

    const userService = new UserService()
    const usersController = new UsersController(userService)

    router.get(
        '/',
        jwtMiddleware,
        usersController.getAllUsers.bind(usersController)
    )

    return router
}
