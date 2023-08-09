import { PlanRepository } from './modules/plan/plan.repository'
import { PlanService } from './modules/plan/plan.service'
import { UserService } from './modules/user/user.service'
import { VoteService } from './modules/vote/vote.service'

export const planService = new PlanService()
export const userService = new UserService()
export const votingService = new VoteService()
