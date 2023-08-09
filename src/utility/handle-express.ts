import { Request, Response } from 'express'
import { HttpError } from './http-error'

export const handleExpress = <A>(res: Response, fn: () => A) => {
    try {
        const result = fn()
        res.status(200).send(result)
        return result
    } catch (e) {
        if (e instanceof HttpError) {
            res.status(e.status).send({ message: e.message })
            return
        }
        res.status(500).send()
    }
}
