import { type Request, type Response, type NextFunction } from 'express'
import { JwtService } from '../jwt/jwt.service.ts'

const jwtService = new JwtService()

export const jwtMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization
    const token = authHeader?.split(' ')[1]

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    try {
        const decoded = jwtService.verifyToken(token)

        if (!decoded) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        ;(req as any).user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' })
    }
}
