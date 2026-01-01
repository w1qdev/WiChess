type PasswordValidationType = {
    password: string
}

type EmailValidationType = {
    email: string
}

export class FormValidator {
    private static passwordRegexRoles: RegExp =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    private static emailRegexRoles: RegExp =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    static passwordValidation = ({ password }: PasswordValidationType) => {
        return this.passwordRegexRoles.test(password)
    }
    static emailValidation = ({ email }: EmailValidationType) => {
        return this.emailRegexRoles.test(email)
    }
}
