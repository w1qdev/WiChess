import { Router } from 'express'
import { AuthController } from './auth.controller.ts'
import { AuthService } from './auth.service.ts'


export default function AuthModule(): Router {
    const router = Router()
    
    const authService = new AuthService()
    const authController = new AuthController(authService)
    
    // Routes
    router.post('/login', authController.loginUser)
    router.post('/signup', authController.signUpUser)
    router.post('/logout', authController.logoutUser)
    
    return router
}