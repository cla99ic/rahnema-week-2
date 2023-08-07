import express from 'express'
import { authMiddleware, login } from '../auth/auth'
import { createPlan, getAllPlans, getPlanById } from '../repository/plan'
import { validString } from '../tools/str'
import { IVote, getVotesByPlan } from '../repository/vote'
const router = express.Router()

router.get('/plan', authMiddleware, (req, res) => {
    const plans = getAllPlans()
    res.send(plans)
})

router.get('/plan/:id', authMiddleware, (req, res) => {
    const plan = getPlanById(req.params.id)
    if (!plan) return res.status(404).send({ error: 'plan not found' })
    res.send(plan)
})

router.post('/plan', authMiddleware, (req, res) => {
    if (req.user?.role !== 'Admin') return res.status(403).send({ error: 'forbidden' })
    const { title, description, deadline1, deadline2 } = req.body
    const now = Date.now()
    if (!validString(title)) return res.status(400).send({ error: 'invalid title' })
    if (!validString(description)) return res.status(400).send({ error: 'invalid description' })
    if (isNaN(Number(deadline1)) || Number(deadline1) < now) return res.status(400).send({ error: 'invalid deadline1' })
    if (isNaN(Number(deadline2)) || Number(deadline2) < now) return res.status(400).send({ error: 'invalid deadline2' })
    if (Number(deadline2) < Number(deadline1)) return res.status(400).send({ error: 'deadline2 should be greater than deadline1' })
    const plan = createPlan(title, Number(deadline1), Number(deadline2), description)
    res.send(plan)
})

router.get('/plan/:id/result', authMiddleware, (req, res) => {
    const plan = getPlanById(req.params.id)
    if (!plan) return res.status(404).send({ error: 'plan not found' })
    const votes = getVotesByPlan(plan.id)
    const result = votes.reduce((acc: Record<string, number>, vote: IVote) => {
        const { candidate } = vote
        acc[candidate] = (acc[candidate] || 0) + 1
        return acc
    }, {})
    res.send(result)
})

export default router
