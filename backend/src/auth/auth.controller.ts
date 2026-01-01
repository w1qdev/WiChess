import { type Request, type Response } from 'express'
import { AuthService } from './auth.service.ts'
import { z } from 'zod'
import { ValidationService } from '../utils/validation.service.ts'

export class AuthController {
    private authService: AuthService

    constructor(authService: AuthService) {
        this.authService = authService
    }

    loginUser = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body

            if (!email || !password) {
                return res
                    .status(400)
                    .json({ error: 'Email and password are required' })
            }

            const result = await this.authService.login({ email, password })
            return res.status(200).json(result)
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' })
        }
    }

    signUpUser = async (req: Request, res: Response) => {
        try {
            const { email, password, passwordRepeat } = req.body

            if (!ValidationService.validateEmail(email)) {
                return res.status(400).json({ error: 'Неверный Email' })
            }

            if (!ValidationService.validatePassword(password)) {
                return res.status(400).json({ error: 'Неверный Пароль' })
            }

            if (password !== passwordRepeat) {
                return res.status(400).json({ error: 'Пароли не совпадают' })
            }

            const result = await this.authService.signUp({ email, password })

            return res.status(200).json(result)
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' })
        }
    }

    logoutUser = async (req: Request, res: Response) => {
        try {
            const { email } = req.body

            const result = await this.authService.logout({ email })
            return res.status(200).json(result)
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' })
        }
    }
}
