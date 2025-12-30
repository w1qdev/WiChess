import 'dotenv/config'
import jwt from 'jsonwebtoken'
import { v4 as uuid } from 'uuid'

export class JwtService {
    private jwt: typeof jwt
    private uuid: typeof uuid
    private secretKey: string | undefined

    constructor() {
        this.jwt = jwt
        this.uuid = uuid
        this.secretKey = process.env.JWT_SECRET_KEY
    }

    createJwtToken(userId: string) {
        const token = this.jwt.sign(
            { id: userId },
            `${process.env.JWT_SECRET_KEY}`
        )

        return token
    }
}
