import express, { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import { app as planRoutes } from './routes/plan.route'
import { app as userRoutes } from './routes/user.route'
import { ZodError } from 'zod'

export const app = express()

app.use(express.json())

if (process.env.NODE_ENV !== 'Test') {
    app.use((req, res, next) => {
        //   console.log(req.url, req.method)
        next()
    })
}

app.use('/plan', planRoutes)
app.use(userRoutes)

app.use((req, res) => {
    res.status(404).send({ message: 'Not Found' })
})

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err instanceof ZodError) {
        res.status(400).send({ message: err.errors })
        return
    }
    res.status(500).send()
}
app.use(errorHandler)
