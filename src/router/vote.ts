import express from 'express'
import { authMiddleware, login } from '../auth/auth'
import { getPlanById } from '../repository/plan'
import { getUserById } from '../repository/user'
import { createVote, getUserVoteByPlan } from '../repository/vote'
import { getProgramByUserAndPlan } from '../repository/program'
const router = express.Router()

router.post('/vote', authMiddleware, (req, res) => {
    if (!req.user) return res.status(500).send({ error: 'server error: user not found' })
    const { PlanId, candidate } = req.body
    const plan = getPlanById(PlanId)
    if (!plan) return res.status(404).send({ error: 'plan not found' })
    const candidateUser = getUserById(candidate)
    if (!candidateUser) return res.status(404).send({ error: 'candidate not found' })
    if (plan.deadline2 < Date.now()) return res.status(403).send({ error: 'voting has been finished' })
    if (plan.deadline1 > Date.now()) return res.status(403).send({ error: 'voting has not started yet' })
    const existingVote = getUserVoteByPlan(req.user?.id, plan.id)
    if (existingVote) return res.status(403).send({ error: 'you already have voted for this plan' })
    const program = getProgramByUserAndPlan(candidateUser.id, plan.id)
    const vote = createVote(req.user.id, candidate.id, plan.id, program?.id)
})

export default router
