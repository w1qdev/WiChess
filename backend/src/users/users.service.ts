import { prismaClient } from '../prisma/prisma.module.ts'

type getAllUsersResponse = Promise<
    {
        id: string
        email: string
        username: string
        rating: number
    }[]
>

type UserServiceType = {
    getAllUsers: () => getAllUsersResponse
}

type CreateUserCredentials = {
    id: string
    email: string
    password: string
    username: string
    rating?: number
}

export class UserService implements UserServiceType {
    async getAllUsers(): getAllUsersResponse {
        const users = await prismaClient.user.findMany({
            select: {
                id: true,
                email: true,
                username: true,
                rating: true,
            },
        })

        return users
    }

    async getUserByEmail(email: string) {
        const user = await prismaClient.user.findFirst({
            where: {
                email,
            },
        })

        return user
    }

    async createUser(credentials: CreateUserCredentials) {
        const { id, email, password, username, rating } = credentials

        const newUser = await prismaClient.user.create({
            data: {
                id,
                email,
                password,
                username,
                rating,
            },
        })

        return newUser
    }
}
