import api from './api.config'

type UserDataLogIn = {
    email: string
    password: string
}

type UserDataSignUp = UserDataLogIn & {
    passwordRepeat: string
}

class APIService {
    private api

    constructor() {
        this.api = api
    }

    async loginUser(userData: UserDataLogIn) {
        const result = await this.api.post('/auth/login', userData)

        return result
    }

    async signUpUser(userData: UserDataSignUp) {
        const result = await this.api.post('/auth/signup', userData)

        return result
    }
}

export const apiInstance = new APIService()
