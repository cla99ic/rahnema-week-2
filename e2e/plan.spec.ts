import request from 'supertest'
import { app } from '../src/api'
import { loginAdminTest, loginRepTest } from './utility'

describe('Plan', () => {
    describe('Create', () => {
        it('should fail if we did not login', async () => {
            await request(app).post('/plan').expect(401)
        })

        it('should fail if user is not admin', async () => {
            const user = await loginRepTest()
            const today = new Date()
            const tomorrow = new Date(today.setDate(today.getDate() + 1))
            await request(app).post('/plan').send({ title: 'Test', description: 'Test2', deadline: tomorrow }).set('authorization', user.id).expect(403)
        })

        it('should create a plan if we are logged in', async () => {
            const user = await loginAdminTest()
            const today = new Date()
            const tomorrow = new Date(today.setDate(today.getDate() + 1))
            const { body: plan } = await request(app).post('/plan').send({ title: 'Test', description: 'Test2', deadline: tomorrow }).set('authorization', user.id).expect(200)
            expect(plan.title).toBe('Test')
        })

        it('should send badrequest if title is not provided', async () => {
            const user = await loginAdminTest()
            await request(app).post('/plan').send({ description: 'Test2' }).set('authorization', user.id).expect(400)
        })

        it('should read the plan', async () => {
            const user = await loginAdminTest()
            const today = new Date()
            const tomorrow = new Date(today.setDate(today.getDate() + 1))
            const title = 'Oromie'
            const { body: resultPlan } = await request(app).post('/plan').send({ title, description: 'Test2', deadline: tomorrow }).set('authorization', user.id).expect(200)
            expect(resultPlan.title).toBe(title)
        })
    })
})
