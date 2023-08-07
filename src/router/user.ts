import express from 'express'
import { authMiddleware, login } from '../auth/auth'
import { send } from '../../app'
const router = express.Router()

router.post('/user/login', (req, res) => {
    const { username, password } = req.body
    const user = login(username, password)
    if (!user) return send(res, { error: 'wrong username or password' }, 401)
    send(res, user)
})

router.get('/user/me', authMiddleware, (req, res) => {
    send(res, req.user)
})

export default router
