import { z } from 'zod'

export class ValidationService {
    // Схемы валидации с Zod
    static loginSchema = z.object({
        email: z
            .string()
            .email('Неверный формат email')
            .max(255, 'Email слишком длинный')
            .transform((val) => val.toLowerCase().trim()),
        password: z
            .string()
            .min(8, 'Пароль должен быть минимум 8 символов')
            .max(128, 'Пароль слишком длинный'),
    })

    static signUpSchema = z
        .object({
            email: z
                .string()
                .email('Неверный формат email')
                .max(255, 'Email слишком длинный')
                .transform((val) => val.toLowerCase().trim()),
            password: z
                .string()
                .min(8, 'Пароль должен быть минимум 8 символов')
                .max(128, 'Пароль слишком длинный')
                .regex(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                    'Пароль должен содержать заглавные, строчные буквы, цифры и спецсимволы'
                ),
            passwordRepeat: z.string(),
        })
        .refine((data) => data.password === data.passwordRepeat, {
            message: 'Пароли не совпадают',
            path: ['passwordRepeat'],
        })

    // Валидация с автоматической санитизацией
    static validateLogin(data: unknown) {
        return this.loginSchema.safeParse(data)
    }

    static validateSignUp(data: unknown) {
        return this.signUpSchema.safeParse(data)
    }
}
