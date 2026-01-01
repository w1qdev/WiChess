import 'dotenv/config'
import jwt from 'jsonwebtoken'

export class JwtService {
    private jwt: typeof jwt
    private secretKey: string | undefined

    constructor() {
        this.jwt = jwt
        this.secretKey = process.env.JWT_SECRET_KEY

        if (!this.secretKey) {
            throw new Error('JWT_SECRET_KEY is not defined')
        }
    }

    createJwtToken(userId: string) {
        const accessToken = this.jwt.sign({ id: userId }, `${this.secretKey}`, {
            expiresIn: '15m',
        })

        const refreshToken = this.jwt.sign(
            { id: userId },
            `${this.secretKey}`,
            {
                expiresIn: '7d',
            }
        )

        return { accessToken, refreshToken }
    }

    verifyToken(token: string) {
        const result = this.jwt.verify(token, `${this.secretKey}`)
        return result
    }
}
