import express from 'express'
import { authMiddleware, login } from '../auth/auth'
import { createPlan, getAllPlans, getPlanById } from '../repository/plan'
import { validString } from '../tools/str'
import { createProgram, deleteProgram, getProgramById, getProgramByUserAndPlan, getProgramsByPlanId, getUserPrograms } from '../repository/program'
import { send } from '../../app'
const router = express.Router()

router.get('/plan/:id/program', authMiddleware, (req, res) => {
    const plan = getPlanById(req.params.id)
    if (!plan) return send(res,{ error: 'not found' },404)
    const now = Date.now()
    if (plan.deadline1 > now) return send(res,{ error: 'programs for this plan are not visible yet' },400)
    const programs = getProgramsByPlanId(req.params.id)
    send(res,programs)
})

router.get('/program/me', authMiddleware, (req, res) => {
    if (req.user?.role != 'Rep') return send(res,{ error: 'forbidden' },403)
    const programs = getUserPrograms(req.user.id)
    send(res,programs)
})

router.post('/program', authMiddleware, (req, res) => {
    if (req.user?.role != 'Rep') return send(res,{ error: 'forbidden' },403)
    const { PlanId, title, description } = req.body
    if (!validString(title)) return send(res,{ error: 'invalid title' },400)
    if (!validString(description)) return send(res,{ error: 'invalid description' },400)
    const plan = getPlanById(PlanId)
    if (!plan) return send(res,{ error: 'plan not found' },404)
    const existingProgram = getProgramByUserAndPlan(req.user.id, plan.id)
    if (existingProgram) deleteProgram(existingProgram.id)
    const program = createProgram(title, description, PlanId, req.user.id)
    send(res,program)
})

router.get('/program/:id', authMiddleware, (req, res) => {
    const program = getProgramById(req.params.id)
    if (!program) return send(res,{ error: 'not found' },404)
    if (program.UserId == req.user?.id) return send(res,program)
    const plan = getPlanById(program.PlanId)
    if (!plan) return send(res,{ error: 'server error: plan not found' },500)
    if (plan.deadline1 > Date.now()) return send(res,{ error: 'program is not visible yet' },403)
    send(res,program)
})

router.delete('/program/:id', authMiddleware, (req, res) => {
    const program = getProgramById(req.params.id)
    if (!program) return send(res,{ error: 'not found' },404)
    if (program.UserId !== req.user?.id) return send(res,{ error: 'forbidden' },403)
    deleteProgram(program.id)
    send(res,{ msg: 'done' })
})

export default router
