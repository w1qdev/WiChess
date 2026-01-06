import { type Request, type Response } from 'express'
import { LoggerService } from '../utils/logger.service.ts'
import { ValidationService } from '../utils/validation.service.ts'
import { AuthService } from './auth.service.ts'

export class AuthController {
    private authService: AuthService
    private logger: LoggerService

    constructor(authService: AuthService) {
        this.authService = authService
        this.logger = new LoggerService()
    }

    loginUser = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body

            if (!email || !password) {
                return res
                    .status(400)
                    .json({ error: 'Email и пароль являются обязательными' })
            }

            const result = await this.authService.login({ email, password })

            this.logger.log(`Пользователь ${email} успешно авторизован`)

            return res.status(200).json(result)
        } catch (error: unknown) {
            this.logger.error(
                error instanceof Error
                    ? error.message
                    : 'Ошибка при логине пользователя'
            )
            return res.status(500).json({ error: 'Внутренняя ошибка сервера' })
        }
    }

    signUpUser = async (req: Request, res: Response) => {
        try {
            const { email, password, passwordRepeat, username } = req.body

            const validationResult = ValidationService.validateSignUp({
                username,
                email,
                password,
                passwordRepeat,
            })

            if (!validationResult.success) {
                const errorMessages = validationResult.error.issues.map(
                    (issue) => issue.message
                )
                return res.status(400).json({
                    error:
                        errorMessages.length > 0
                            ? errorMessages.join(', ')
                            : 'Ошибка валидации данных',
                })
            }

            // Используем валидированные и санитизированные данные
            const {
                email: validatedEmail,
                password: validatedPassword,
                username: validatedUsername,
            } = validationResult.data

            const result = await this.authService.signUp({
                email: validatedEmail,
                password: validatedPassword,
                username: validatedUsername,
            })

            if (result.error) {
                return res.status(400).json({ error: result.error })
            }

            this.logger.log(
                `Новый пользователь успешно создан ${validatedEmail}`
            )
            return res.status(200).json(result)
        } catch (error) {
            this.logger.error(
                error instanceof Error
                    ? error.message
                    : 'Ошибка при регистрации пользователя!'
            )
            return res.status(500).json({ error: 'Внутренняя ошибка сервера' })
        }
    }

    logoutUser = async (req: Request, res: Response) => {
        try {
            const { email } = req.body

            const result = await this.authService.logout({ email })

            this.logger.log(`Пользователь ${email} успешно вышел из системы`)

            return res.status(200).json(result)
        } catch (error: unknown) {
            this.logger.error(
                error instanceof Error
                    ? error.message
                    : 'Ошибка при выходе пользователя'
            )
            return res.status(500).json({ error: 'Внутренняя ошибка сервера' })
        }
    }
}
