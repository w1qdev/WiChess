import winston, { type Logger } from 'winston'

export class LoggerService {
    private logger: Logger

    constructor() {
        this.logger = winston.createLogger({
            level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
            format: winston.format.json(),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({
                    filename: 'error.log',
                    level: 'error',
                }),
                new winston.transports.File({ filename: 'combined.log' }),
            ],
        })
    }

    log(message: string) {
        this.logger.log('info', message)
    }

    error(message: string) {
        this.logger.log('error', message)
    }

    warn(message: string) {
        this.logger.log('warn', message)
    }

    debug(message: string) {
        this.logger.log('debug', message)
    }

    verbose(message: string) {
        this.logger.log('verbose', message)
    }
}
