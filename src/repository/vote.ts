import { nanoid } from 'nanoid'

export interface IVote {
    id: string
    voter: string
    candidate: string
    PlanId: string
    ProgramId?: string
}

let votes: IVote[] = []

export const createVote = (voter: string, candidate: string, PlanId: string, ProgramId?: string) => {
    const vote: IVote = { id: nanoid(), voter, candidate, PlanId, ProgramId }
    votes = [...votes, vote]
    return vote
}

export const getUserVoteByPlan = (userid: string, planid: string) => {
    const vote = votes.find((a) => a.voter == userid && a.PlanId == planid)
    return vote
}

export const getVotesByPlan = (planid: string) => {
    const planVotes = votes.filter((a) => a.PlanId == planid)
    return planVotes
}

export const getAllVotes = () => {
    return votes
}

export const getVoteById = (id: string) => {
    const vote = votes.find((a) => a.id == id)
    return vote
}

export const updateVote = (id: string, updatedData: { voter: string; candidate: string; PlanId: string; ProgramId: string }) => {
    let vote = getVoteById(id)
    if (!vote) return
    vote = { ...vote, ...updatedData }
    return vote
}

export const deleteVote = (id: string) => {
    let found = votes.some((a) => a.id === id)
    votes = votes.filter((a) => a.id !== id)
    return found
}
