import express from 'express'
import { authMiddleware, login } from '../auth/auth'
import { createPlan, getAllPlans, getPlanById } from '../repository/plan'
import { validString } from '../tools/str'
import { IVote, getVotesByPlan } from '../repository/vote'
import { send } from '../../app'
const router = express.Router()

router.get('/plan', authMiddleware, (req, res) => {
    const plans = getAllPlans()
    send(res, plans)
})

router.get('/plan/:id', authMiddleware, (req, res) => {
    const plan = getPlanById(req.params.id)
    if (!plan) return send(res, { error: 'plan not found' }, 404)
    send(res, plan)
})

router.post('/plan', authMiddleware, (req, res) => {
    if (req.user?.role !== 'Admin') return send(res, { error: 'forbidden' }, 403)
    const { title, description, deadline1, deadline2 } = req.body
    const now = Date.now()
    if (!validString(title)) return send(res, { error: 'invalid title' }, 400)
    if (!validString(description)) return send(res, { error: 'invalid description' }, 400)
    if (isNaN(Number(deadline1)) || Number(deadline1) < now) return send(res, { error: 'invalid deadline1' }, 400)
    if (isNaN(Number(deadline2)) || Number(deadline2) < now) return send(res, { error: 'invalid deadline2' }, 400)
    if (Number(deadline2) < Number(deadline1)) return send(res, { error: 'deadline2 should be greater than deadline1' }, 400)
    const plan = createPlan(title, Number(deadline1), Number(deadline2), description)
    send(res, plan)
})

router.get('/plan/:id/result', authMiddleware, (req, res) => {
    const plan = getPlanById(req.params.id)
    if (!plan) return send(res, { error: 'plan not found' }, 404)
    const votes = getVotesByPlan(plan.id)
    const result = votes.reduce((acc: Record<string, number>, vote: IVote) => {
        const { candidate } = vote
        acc[candidate] = (acc[candidate] || 0) + 1
        return acc
    }, {})
    send(res, result)
})

export default router
