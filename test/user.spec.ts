import request from 'supertest'
import { app } from '../app'
import { getAllUsers } from '../src/repository/user'

describe('Auth', () => {
    it('should return 401', () => {
        return request(app).get('/api/user/me').expect(401)
    })
    it('should return user object with token inside (user)', async () => {
        const response = await request(app)
            .post('/api/user/login')
            .send({
                username: 'User1',
                password: 'User1',
            })
            .expect(200)
        expect(response.body.token).toBeDefined()
        const currentUserResponse = await request(app).get('/api/user/me').set('Authorization', response.body.token).expect(200)
        expect(currentUserResponse.body.username).toBeDefined()
    })
    it('should return user object with token inside (Rep)', async () => {
        const response = await request(app)
            .post('/api/user/login')
            .send({
                username: 'Rep1',
                password: 'Rep1',
            })
            .expect(200)
        expect(response.body.token).toBeDefined()
        const currentUserResponse = await request(app).get('/api/user/me').set('Authorization', response.body.token).expect(200)
        expect(currentUserResponse.body.username).toBeDefined()
    })
    it('should return user object with token inside (Admin)', async () => {
        const response = await request(app)
            .post('/api/user/login')
            .send({
                username: 'Admin',
                password: 'Admin',
            })
            .expect(200)
        expect(response.body.token).toBeDefined()
        const currentUserResponse = await request(app).get('/api/user/me').set('Authorization', response.body.token).expect(200)
        expect(currentUserResponse.body.username).toBeDefined()
    })
})
