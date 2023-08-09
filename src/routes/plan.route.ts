import { Router } from 'express'
import { User, users } from './user.route'
import { isNonEmptyString } from '../utility/non-empty-string'
import { handleExpress } from '../utility/handle-express'
import { HttpError } from '../utility/http-error'
import { createPlanDto } from '../modules/plan/dto/create-plan.dto'
import { ZodError, z } from 'zod'
import { loginMiddleware } from '../login-middleware'
import { createProgramDto } from '../modules/program/dto/create-program.dto'
import { planService } from '../dependency'

export const app = Router()

app.post('/', loginMiddleware, (req, res) => {
    try {
        const dto = createPlanDto.parse(req.body)
        handleExpress(res, () => planService.createPlan(dto, req.user))
    } catch (e) {
        if (e instanceof ZodError) {
            res.status(400).send({ message: e.errors })
        }
    }
})

app.post('/:id/program', loginMiddleware, (req, res) => {
    try {
        const dto = createProgramDto.parse({ ...req.body, planId: req.params.id })
        handleExpress(res, () => planService.createProgram(dto, req.user))
    } catch (e) {
        if (e instanceof ZodError) {
            res.status(400).send({ message: e.errors })
        }
    }
})

app.get('/:id', (req, res) => {
    const id = z.coerce.number().parse(req.params.id)
    handleExpress(res, () => planService.getPlanById(id))
})
