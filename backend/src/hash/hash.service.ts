import bcrypt from 'bcrypt'

export class HashService {
    private bcrypt: typeof bcrypt
    private saltRoundsDefault: number

    constructor() {
        this.bcrypt = bcrypt
        this.saltRoundsDefault = 10
    }

    async hashPassword(
        password: string,
        saltRounds: number = this.saltRoundsDefault
    ) {
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        return hashedPassword
    }

    async verifyPassword(inComePassword: string, storedPassword: string) {
        const isMatch = await bcrypt.compare(inComePassword, storedPassword)
        return isMatch
    }
}
