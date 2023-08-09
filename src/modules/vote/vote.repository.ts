import { Plan } from '../plan/model/plan'
import { User } from '../user/model/user'

export interface CreateVote {
    userId: string
    planId: number
    programId: number
    candidateId: string
}

export class VoteRepository {
    private votes: Vote[] = []

    private getNextId() {
        return this.votes.length + 1
    }

    create(vote: CreateVote): Vote {
        const newVote: Vote = { ...vote, id: this.getNextId() }
        this.votes.push(newVote)
        return newVote
    }

    public findByUserIdAndPlanId(userId: string, planId: number) {
        return this.votes.find((a) => a.userId == userId && a.planId === planId)
    }
}
