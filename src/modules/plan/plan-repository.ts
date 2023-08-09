import { Program } from '../program/model/program'
import { Plan } from './model/plan'

export interface CreatePlan {
    title: string
    description: string
    deadline: Date
    programs: Program[]
}

interface CreateProgram {
    description: string
    planId: number
    title: string
    userId: string
}

export class PlanRepository {
    private plans: Plan[] = []

    private getNextId() {
        return this.plans.length + 1
    }

    public create(plan: CreatePlan): Plan {
        const newPlan = { ...plan, id: this.getNextId() }
        this.plans.push(newPlan)
        return newPlan
    }

    public findById(id: number) {
        return this.plans.find((a) => a.id === id)
    }

    public addProgram(plan: Plan, program: CreateProgram): Program {
        const newProgram: Program = {
            id: plan.programs.length + 1,
            description: program.description,
            planId: plan.id,
            title: program.title,
            userId: program.userId,
        }
        plan.programs.push(newProgram)
        return newProgram
    }
}
