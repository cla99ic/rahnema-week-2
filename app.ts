import express, { Response } from 'express'
import path from 'path'
import fs from 'fs'
import { getAllFilePaths } from './src/tools/file'
import { createMockData } from './src/tools/mock'

export const app = express()
app.use(express.json())

app.get('/ping', (req, res) => res.send({ pong: 'pong' }))

const loadRouters = async () => {
    if (process.env.ENGINE == 'node') {
        const files = getAllFilePaths(path.join(process.cwd(), 'dist', 'src', 'router'))
        for (let file of files) {
            try {
                if (!file.endsWith('.map')) {
                    const router = require(file)
                    app.use('/api', router.default)
                }
            } catch (e) {}
        }
    } else {
        const files = getAllFilePaths(path.join(process.cwd(), 'src', 'router'))
        for (let file of files) {
            try {
                const router = await import(file)
                app.use('/api', router.default)
            } catch (e: any) {
                console.log(e.message)
            }
        }
    }
}

loadRouters()

export const send = (res: Response, body: any, status = 200) => {
    res.status(status).send(body)
}

createMockData()
