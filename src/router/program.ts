import express from 'express'
import { authMiddleware, login } from '../auth/auth'
import { createPlan, getAllPlans, getPlanById } from '../repository/plan'
import { validString } from '../tools/str'
import { createProgram, deleteProgram, getProgramById, getProgramByUserAndPlan, getProgramsByPlanId, getUserPrograms } from '../repository/program'
const router = express.Router()

router.get('/plan/:id/program', authMiddleware, (req, res) => {
    const plan = getPlanById(req.params.id)
    if (!plan) return res.status(404).send({ error: 'not found' })
    const now = Date.now()
    if (plan.deadline1 > now) return res.status(400).send({ error: 'programs for this plan are not visible yet' })
    const programs = getProgramsByPlanId(req.params.id)
    res.send(programs)
})

router.get('/program/me', authMiddleware, (req, res) => {
    if (req.user?.role != 'Rep') return res.status(403).send({ error: 'forbidden' })
    const programs = getUserPrograms(req.user.id)
    res.send(programs)
})

router.post('/program', authMiddleware, (req, res) => {
    if (req.user?.role != 'Rep') return res.status(403).send({ error: 'forbidden' })
    const { PlanId, title, description } = req.body
    if (!validString(title)) return res.status(400).send({ error: 'invalid title' })
    if (!validString(description)) return res.status(400).send({ error: 'invalid description' })
    const plan = getPlanById(PlanId)
    if (!plan) return res.status(404).send({ error: 'plan not found' })
    const existingProgram = getProgramByUserAndPlan(req.user.id, plan.id)
    if (existingProgram) deleteProgram(existingProgram.id)
    const program = createProgram(title, description, PlanId, req.user.id)
    res.send(program)
})

router.get('/program/:id', authMiddleware, (req, res) => {
    const program = getProgramById(req.params.id)
    if (!program) return res.status(404).send({ error: 'not found' })
    if (program.UserId == req.user?.id) return res.send(program)
    const plan = getPlanById(program.PlanId)
    if (!plan) return res.status(500).send({ error: 'server error: plan not found' })
    if (plan.deadline1 > Date.now()) return res.status(403).send({ error: 'program is not visible yet' })
    res.send(program)
})

router.delete('/program/:id', authMiddleware, (req, res) => {
    const program = getProgramById(req.params.id)
    if (!program) return res.status(404).send({ error: 'not found' })
    if (program.UserId !== req.user?.id) return res.status(403).send({ error: 'forbidden' })
    deleteProgram(program.id)
    res.send({ msg: 'done' })
})

export default router
