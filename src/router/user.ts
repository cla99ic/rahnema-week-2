import express from 'express'
import { authMiddleware, login } from '../auth/auth'
const router = express.Router()

router.post('/user/login', (req, res) => {
    const { username, password } = req.body
    const user = login(username, password)
    if (!user) return res.status(401).send({ error: 'wrong username or password' })
    res.send(user)
})

router.get('/user/me', authMiddleware, (req, res) => {
    res.send(req.user)
})

export default router
