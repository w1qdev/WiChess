import 'dotenv/config'
import { v4 as uuid } from 'uuid'
import { HashService } from '../hash/hash.service.ts'
import { JwtService } from '../jwt/jwt.service.ts'
import { UserService } from '../users/users.service.ts'

type LoginCredentials = {
    email: string
    password: string
}

type LoginResponse = {
    success?: boolean
    token?: string
    user?: {
        id: string
        email: string
    }
    error?: string
}

type LogoutCredentials = {
    email: string
}

type LogoutResponse = {
    success: boolean
}

type SignUpCredentials = {
    email: string
    password: string
}

type SignUpResponse = {
    success?: boolean
    error?: string
    tokens?: {
        accessToken: string
        refreshToken: string
    }
}

type AuthServiceType = {
    login: (credentials: LoginCredentials) => Promise<LoginResponse>
    logout: (credentials: LoginCredentials) => Promise<LogoutResponse>
}

export class AuthService implements AuthServiceType {
    private hashService: HashService
    private jwtService: JwtService
    private userService: UserService

    constructor() {
        this.hashService = new HashService()
        this.jwtService = new JwtService()
        this.userService = new UserService()
    }

    async login(credentials: LoginCredentials): Promise<LoginResponse> {
        const { email, password } = credentials

        const user = await this.userService.getUserByEmail(email)

        if (!user?.id) {
            return {
                error: 'The user does not exists',
            }
        }

        const verifyPassword = await this.hashService.verifyPassword(
            password,
            user.password
        )

        if (!verifyPassword) {
            return {
                error: 'Passwords does not equals',
            }
        }

        const { accessToken } = this.jwtService.createJwtToken(user.id)

        return {
            success: true,
            token: accessToken,
        }
    }

    async signUp(credentials: SignUpCredentials): Promise<SignUpResponse> {
        const { email, password } = credentials

        const isUserExists = await this.userService.getUserByEmail(email)

        if (isUserExists?.id) {
            return {
                error: 'The user already exists',
            }
        }

        const userId = uuid()
        const { accessToken, refreshToken } =
            this.jwtService.createJwtToken(userId)
        const hashedPassword = await this.hashService.hashPassword(password)

        await this.userService.createUser({
            id: userId,
            email,
            password: hashedPassword,
        })

        return {
            success: true,
            tokens: { accessToken, refreshToken },
        }
    }

    async logout(credentials: LogoutCredentials): Promise<LogoutResponse> {
        // some bissines logic

        return {
            success: true,
        }
    }
}
