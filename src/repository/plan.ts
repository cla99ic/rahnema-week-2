import { nanoid } from 'nanoid'

interface IPlan {
    id: string
    title: string
    description: string
    deadline1: number
    deadline2: number
}

let plans: IPlan[] = []

export const createPlan = (title: string, deadline1: number, deadline2: number, description: string) => {
    const plan: IPlan = { title, description, deadline1, deadline2, id: nanoid() }
    plans = [...plans, plan]
    return plan
}

export const getAllPlans = () => {
    return plans
}

export const getPlanById = (id: string) => {
    const plan = plans.find((a) => a.id == id)
    return plan
}

export const updatePlan = (id: string, updatedData: { title?: string; description?: string; deadline1?: number; deadline2?: number; }) => {
    let plan = getPlanById(id)
    if (!plan) return
    plan = { ...plan, ...updatedData }
    return plan
}

export const deletePlan = (id: string) => {
    let found = plans.some((a) => a.id === id)
    plans = plans.filter((a) => a.id !== id)
    return found
}
