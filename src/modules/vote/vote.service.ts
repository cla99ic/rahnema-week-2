import { planService } from '../../dependency'
import { HttpError, NotFoundError } from '../../utility/http-error'
import { Plan } from '../plan/model/plan'
import { User } from '../user/model/user'
import { CreateVoteDto } from './dto/create-vote.dto'
import { VoteRepository } from './vote.repository'

export class VoteService {
    private voteRepo: VoteRepository
    constructor() {
        this.voteRepo = new VoteRepository()
    }

    createVote(dto: CreateVoteDto, user: User) {
        const program = planService.getProgramById(dto.planId, dto.programId)
        const plan = planService.getPlanById(dto.planId)
        const vote = {
            userId: user.id,
            programId: program.id,
            planId: plan.id,
            candidateId: program.userId,
        }
        const newVote = this.voteRepo.create(vote)
        planService.increaseProgramVote(plan.id, program.id)
        return newVote
    }

    canVote(user: User, plan: Plan) {
        return (
            plan.votingDeadline.getTime() < Date.now() &&
            !this.voteRepo.findByUserIdAndPlanId(user.id, plan.id)
        )
    }
}
