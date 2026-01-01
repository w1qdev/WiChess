import { NextFunction } from 'express'

// class ErrorMiddleware {
//     static handleError(
//         err: Error,
//         req: Request,
//         res: Response,
//         next: NextFunction
//     ) {
//         console.error(err.stack)
//         res.status(500).json({ error: 'Internal server error' })
//     }

//     static handleValidationError(
//         err: ValidationError,
//         req: Request,
//         res: Response,
//         next: NextFunction
//     ) {
//         console.error(err.stack)
//         res.status(400).json({ error: 'Validation error' })
//     }

//     static handleAuthenticationError(
//         err: AuthenticationError,
//         req: Request,
//         res: Response,
//         next: NextFunction
//     ) {
//         console.error(err.stack)
//         res.status(401).json({ error: 'Authentication error' })
//     }
// }
