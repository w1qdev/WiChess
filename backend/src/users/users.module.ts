import { Router } from 'express'
import { UsersController } from './users.controller.ts'
import { UserService } from './users.service.ts'

export default function UserModule(): Router {
    const router = Router()

    const userService = new UserService()
    const usersController = new UsersController(userService)

    router.get('/', usersController.getAllUsers.bind(usersController))

    return router
}
