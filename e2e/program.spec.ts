import request from 'supertest'
import { app } from '../src/api'
import { loginAdminTest, loginRepTest } from './utility'

describe('Program', () => {
    describe('Create', () => {
        it('should fail if did not log in', async () => {
            const admin = await loginAdminTest()
            const today = new Date()
            const tomorrow = new Date(today.setDate(today.getDate() + 1))
            const { body: plan } = await request(app)
                .post('/plan')
                .send({ title: 'Test', description: 'Test2', deadline: tomorrow })
                .set('authorization', admin.id)
                .expect(200)
            await request(app).post(`/plan/${plan.id}/program`).expect(401)
        })

        it('should create a program', async () => {
            const user = await loginRepTest()
            const admin = await loginAdminTest()
            const today = new Date()
            const tomorrow = new Date(today.setDate(today.getDate() + 1))
            const { body: plan } = await request(app)
                .post('/plan')
                .send({ title: 'Test', description: 'Test2', deadline: tomorrow })
                .set('authorization', admin.id)
                .expect(200)
            const { body: program } = await request(app)
                .post(`/plan/${plan.id}/program`)
                .send({
                    planId: plan.id,
                    title: 'oromie',
                    description: 'oromie khoobe',
                })
                .set('authorization', user.id)
                .expect(200)
        })
    })
})
