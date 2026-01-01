import cors from 'cors'
import express, { type Express } from 'express'
import helmet from 'helmet'
import authModule from '../auth/auth.module.ts'
import UserModule from '../users/users.module.ts'
import { LoggerService } from '../utils/logger.service.ts'

export class AppService {
    private app: Express | null
    private PORT: number | string
    private logger: LoggerService

    constructor(port: number = 3000) {
        this.app = express()
        this.PORT = process.env.SERVER_PORT || port || 3000
        this.logger = new LoggerService()
    }

    run(callbackFn?: () => void) {
        this.app?.use(express.json())
        this.app?.use(helmet())
        this.app?.use(
            cors({
                origin: 'http://localhost:5173',
                credentials: true,
            })
        )

        this.app?.use('/api/auth', authModule())
        this.app?.use('/api/users', UserModule())

        if (this.app) {
            this.app.listen(this.PORT, callbackFn)
            // this.logger.log(`Сервер успешно запущен на порте ${this.PORT}`)
        }
    }

    stop() {
        this.app = null
        // this.logger.log('Сервер успешно остановлен')
    }
}
