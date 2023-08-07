import express from 'express'
import { authMiddleware, login } from '../auth/auth'
import { getPlanById } from '../repository/plan'
import { getUserById } from '../repository/user'
import { createVote, getUserVoteByPlan } from '../repository/vote'
import { getProgramByUserAndPlan } from '../repository/program'
import { send } from '../../app'
const router = express.Router()

router.post('/vote', authMiddleware, (req, res) => {
    if (!req.user) return send(res, { error: 'server error: user not found' }, 500)
    const { PlanId, candidate } = req.body
    const plan = getPlanById(PlanId)
    if (!plan) return send(res, { error: 'plan not found' }, 404)
    const candidateUser = getUserById(candidate)
    if (!candidateUser) return send(res, { error: 'candidate not found' }, 404)
    if (plan.deadline2 < Date.now()) return send(res, { error: 'voting has been finished' }, 403)
    if (plan.deadline1 > Date.now()) return send(res, { error: 'voting has not started yet' }, 403)
    const existingVote = getUserVoteByPlan(req.user?.id, plan.id)
    if (existingVote) return send(res, { error: 'you already have voted for this plan' }, 403)
    const program = getProgramByUserAndPlan(candidateUser.id, plan.id)
    const vote = createVote(req.user.id, candidate.id, plan.id, program?.id)
    send(res, vote)
})

export default router
