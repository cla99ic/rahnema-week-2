import { nanoid } from 'nanoid'

interface IProgram {
    id: string
    title: string
    description: string
    PlanId: string
    UserId: string
}

let programs: IProgram[] = []

export const createProgram = (title: string, description: string, PlanId: string, UserId: string) => {
    const program: IProgram = { title, description, id: nanoid(), PlanId, UserId }
    programs = [...programs, program]
    return program
}

export const getAllPrograms = () => {
    return programs
}

export const getProgramById = (id: string) => {
    const program = programs.find((a) => a.id == id)
    return program
}

export const getProgramsByPlanId = (id: string) => {
    const result = programs.filter((a) => a.PlanId == id)
    return result
}

export const getUserPrograms = (id: string) => {
    const result = programs.filter((a) => a.UserId == id)
    return result
}

export const getProgramByUserAndPlan = (userid:string,planid:string)=>{
    const program = programs.find(a=>a.PlanId==planid&&a.UserId==userid)
    return program
}

export const updateProgram = (id: string, updatedData: { title?: string; description?: string; PlanId?: string; UserId?: string }) => {
    let program = getProgramById(id)
    if (!program) return
    program = { ...program, ...updatedData }
    return program
}

export const deleteProgram = (id: string) => {
    let found = programs.some((a) => a.id === id)
    programs = programs.filter((a) => a.id !== id)
    return found
}
