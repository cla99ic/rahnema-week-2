import { Router } from 'express'
import { userService, votingService } from '../dependency'
import { loginDto } from '../modules/user/dto/login.dto'
import { handleExpress } from '../utility/handle-express'
import { createVoteDto } from '../modules/vote/dto/create-vote.dto'
import { loginMiddleware } from '../login-middleware'

export const app = Router()

app.post('/vote', loginMiddleware, (req, res) => {
    const dto = createVoteDto.parse(req.body)
    handleExpress(res, () => votingService.createVote(dto, req.user))
})
