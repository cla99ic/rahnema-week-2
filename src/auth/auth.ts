import { NextFunction, Request, Response } from 'express'
import { findUserByCredentials, findUserByToken, updateUser } from '../repository/user'
import { genRandomString } from '../tools/str'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.header('Authorization')) {
        const user = findUserByToken((req.header('Authorization') as string).replace('Bearer ', ''))
        if (user) {
            req.user = user
            return next()
        }
    }
    return res.status(401).send({ error: 'Unauthorized' })
}

export const login = (username: string, password: string) => {
    let user = findUserByCredentials(username, password)
    if (user) {
        const token = genRandomString()
        user = updateUser(user.id, { token })
    }
    return user
}
