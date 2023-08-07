import { nanoid } from 'nanoid'

export type Role = 'Admin' | 'Rep' | 'User'
export interface IUser {
    id: string
    username: string
    password: string
    role: Role
    token?: string
}

let users: IUser[] = []

export const createUser = (username: string, password: string, role: Role) => {
    const user: IUser = { username, password, role, id: nanoid() }
    users = [...users, user]
    return user
}

export const getAllUsers = () => {
    return users
}

export const getUserById = (id: string) => {
    const user = users.find((a) => a.id == id)
    return user
}

export const updateUser = (id: string, updatedData: { username?: string; password?: string; role?: Role; token?: string }) => {
    let user = getUserById(id)
    if (!user) return
    const index = users.indexOf(user)
    user = { ...user, ...updatedData }
    users[index] = user
    return user
}

export const deleteUser = (id: string) => {
    let found = users.some((a) => a.id === id)
    users = users.filter((a) => a.id !== id)
    return found
}

export const findUserByToken = (token: string) => {
    const user = users.find((a) => a.token == token)
    return user
}

export const findUserByCredentials = (username: string, password: string) => {
    const user = users.find((a) => a.username == username && a.password == password)
    return user
}
