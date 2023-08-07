import { createPlan } from '../repository/plan'
import { createProgram } from '../repository/program'
import { Role, createUser } from '../repository/user'
import { createVote } from '../repository/vote'

export const createMockData = () => {
    const admin = createUser('Admin', 'Admin', 'Admin')
    const rep1 = createUser('Rep1', 'Rep1', 'Rep')
    const rep2 = createUser('Rep2', 'Rep2', 'Rep')
    const rep3 = createUser('Rep3', 'Rep3', 'Rep')
    const user1 = createUser('User1', 'User1', 'User')
    const user2 = createUser('User2', 'User2', 'User')
    const user3 = createUser('User3', 'User3', 'User')
    const user4 = createUser('User4', 'User4', 'User')
    const user5 = createUser('User5', 'User5', 'User')
    const user6 = createUser('User6', 'User6', 'User')
    const user7 = createUser('User7', 'User7', 'User')
    const user8 = createUser('User8', 'User8', 'User')
    const user9 = createUser('User9', 'User9', 'User')
    const user10 = createUser('User10', 'User10', 'User')

    const plan1 = createPlan('Plan1', 1690891200000, 1691064000000, 'Plan2')

    const program1 = createProgram('Program1', 'Program1', plan1.id, rep1.id)
    const program2 = createProgram('Program2', 'Program2', plan1.id, rep2.id)
    const program3 = createProgram('Program3', 'Program3', plan1.id, rep3.id)

    const vote1 = createVote(user1.id, rep1.id, plan1.id, program1.id)
    const vote2 = createVote(user2.id, rep2.id, plan1.id, program2.id)
    const vote3 = createVote(user3.id, rep2.id, plan1.id, program2.id)
    const vote4 = createVote(user4.id, rep1.id, plan1.id, program1.id)
    const vote5 = createVote(user5.id, rep3.id, plan1.id, program3.id)
    const vote6 = createVote(user6.id, rep3.id, plan1.id, program3.id)
    const vote7 = createVote(user7.id, rep3.id, plan1.id, program3.id)
    const vote8 = createVote(user8.id, rep3.id, plan1.id, program3.id)
    const vote9 = createVote(user9.id, rep2.id, plan1.id, program2.id)
    const vote10 = createVote(user10.id, rep1.id, plan1.id, program1.id)
}
