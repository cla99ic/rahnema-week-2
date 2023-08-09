import { Router } from 'express'
import { userService } from '../dependency'
import { loginDto } from '../modules/user/dto/login.dto'
import { handleExpress } from '../utility/handle-express'

export const app = Router()

app.post('/login', (req, res) => {
    const dto = loginDto.parse(req.body)
    handleExpress(res, () => userService.login(dto))
})
