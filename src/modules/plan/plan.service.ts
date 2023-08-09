import { ForbiddenError, HttpError, NotFoundError } from '../../utility/http-error'
import { CreateProgramDto } from '../program/dto/create-program.dto'
import { Program } from '../program/model/program'
import { User } from '../user/model/user'
import { CreatePlanDto } from './dto/create-plan.dto'
import { Plan } from './model/plan'
import { PlanRepository } from './plan.repository'

export class PlanService {
    
    private planRepo: PlanRepository

    constructor() {
        this.planRepo = new PlanRepository()
    }

    getPlanById(planId: number) {
        const plan = this.planRepo.findById(planId)
        if (plan === undefined) {
            throw new HttpError(400, 'Plan Not Found')
        }
        return plan
    }

    getProgramById(planId: number, programId: number): Program {
        const plan = this.planRepo.findById(planId)
        if (plan === undefined) {
            throw new NotFoundError()
        }
        const program = plan.programs.find((a) => a.id == programId)
        if (program === undefined) {
            throw new NotFoundError()
        }
        return program
    }

    createPlan(dto: CreatePlanDto, loggedInUser: User): Plan {
        const plan = {
            title: dto.title,
            description: dto.description || '',
            deadline: dto.deadline,
            votingDeadline: dto.votingDeadline,
            programs: [],
        }

        if (dto.deadline.getTime() < Date.now()) {
            throw new HttpError(400, 'you should not use a deadline in the past')
        }

        if (loggedInUser.role !== 'Admin') {
            throw new HttpError(403, 'you are not authorized')
        }
        const newPlan = this.planRepo.create(plan)
        return newPlan
    }

    createProgram(dto: CreateProgramDto, user: User): Program {
        const plan = this.planRepo.findById(dto.planId)
        if (plan === undefined) {
            throw new NotFoundError()
        }

        if (this.canCreateProgram(user, plan)) {
            const newProgram = this.planRepo.addProgram(plan, {
                description: dto.description || '',
                planId: plan.id,
                title: dto.title,
                userId: user.id,
            })
            return newProgram
        } else {
            throw new HttpError(400, 'program is not valid')
        }
    }

    increaseProgramVote(planId: number, programId: number) {
        const program = this.getProgramById(planId, programId)
        program.votes = program.votes + 1
        return program
    }

    public canCreateProgram(user: User, plan: Plan): boolean {
        if (user.role !== 'Representative') {
            throw new ForbiddenError()
        }
        if (plan.deadline.getTime() < Date.now()) {
            return false
        }
        const program = plan.programs.find((a) => a.planId === plan.id)
        if (program) {
            return false
        }
        return true
    }
}
