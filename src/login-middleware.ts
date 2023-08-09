import { NextFunction, Request, Response } from 'express'
import { userService } from './dependency'

export const loginMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.headers['authorization'] || ''
    const loggedInUser = userService.authenticate(userId)
    req.user = loggedInUser
    next()
}
