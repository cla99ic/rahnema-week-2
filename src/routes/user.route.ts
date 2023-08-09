import { Router } from 'express'
import { v4 } from 'uuid'
import { loginDto } from '../modules/user/dto/login.dto'
import { login } from '../modules/user/login'
import { handleExpress } from '../utility/handle-express'

type UserRole = 'Admin' | 'Representative' | 'Normal'

export interface User {
    id: string
    username: string
    password: string
    role: UserRole
}

export const users: User[] = [
    { id: v4(), username: 'admin', password: 'admin', role: 'Admin' },
    { id: v4(), username: 'rep', password: 'rep', role: 'Representative' },
]

export const app = Router()

app.post('/login', (req, res) => {
    const dto = loginDto.parse(req.body)
    handleExpress(res, () => login(dto))
})
