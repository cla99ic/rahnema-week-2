import request from 'supertest'
import { app } from '../app'

describe('Plan', () => {
    let token = ''
    let planId = ''
    it('should login', async () => {
        const loginResponse = await request(app).post('/api/user/login').send({
            username: 'Admin',
            password: 'Admin',
        })
        token = loginResponse.body.token
    })
    it('should get one plan', async () => {
        const response = await request(app).get('/api/plan').set('Authorization', token)
        const body = response.body
        expect(body).toHaveLength(1)
        planId = body[0].id
    })
    it('should get plan by id', async () => {
        const response = await request(app)
            .get('/api/plan/' + planId)
            .set('Authorization', token)
        const body = response.body
        expect(body.id).toEqual(planId)
    })
    it('should create a new plan', async () => {
        const response = await request(app)
            .post('/api/plan')
            .set('Authorization', token)
            .send({
                title: 'Plan2',
                description: 'Plan2',
                deadline1: 1790871200000,
                deadline2: 1890881200000,
            })
            .expect(200)
        expect(response.body.id).toBeDefined()
        planId = response.body.id
    })
    it('should fail to create a new plan', async () => {
        const response = await request(app)
            .post('/api/plan')
            .set('Authorization', token)
            .send({
                description: 'Plan3',
            })
            .expect(400)
    })
    it('should fail to create a new plan', async () => {
        const response = await request(app)
            .post('/api/plan')
            .set('Authorization', token)
            .send({
                name: 'Plan3',
            })
            .expect(400)
    })
    it('should fail to create a new plan', async () => {
        const response = await request(app).post('/api/plan').set('Authorization', token).send({}).expect(400)
    })
    it('should fail to create a new plan', async () => {
        const response = await request(app)
            .post('/api/plan')
            .send({
                title: 'Plan3',
                description: 'Plan3',
            })
            .expect(401)
    })
})
