import { planService } from '../../dependency'
import { ForbiddenError } from '../../utility/http-error'
import { PlanService } from './plan.service'

describe('Create Program', () => {
    // let planService: PlanService
    // beforeAll(() => {
    //     planService = new PlanService()
    // })
    it('should not create program if user is not represantative', () => {
        expect(() =>
            planService.canCreateProgram(
                { username: 'foo', password: 'bar', role: 'Normal', id: 'sfwef' },
                { id: 1, title: 'Oromie', description: '', programs: [], deadline: new Date() }
            )
        ).toThrow(ForbiddenError)
    })

    it('should not create program if user already has a program', () => {
        expect(
            planService.canCreateProgram(
                { username: 'foo', password: 'bar', role: 'Representative', id: 'sfwef' },
                {
                    id: 1,
                    title: 'Oromie',
                    description: '',
                    programs: [
                        { id: 1, title: 'foo', description: 'bar', userId: 'sfwef', planId: 1 },
                    ],
                    deadline: new Date(),
                }
            )
        ).toBe(false)
    })

    it('should not create program if plan deadline has passed', () => {
        const today = new Date()
        const yesterday = new Date(today.setDate(today.getDate() - 1))
        expect(
            planService.canCreateProgram(
                { username: 'foo', password: 'bar', role: 'Representative', id: 'sfwef' },
                {
                    id: 1,
                    title: 'Oromie',
                    description: '',
                    programs: [],
                    deadline: yesterday,
                }
            )
        ).toBe(false)
    })

    it('should return true', () => {
        const today = new Date()
        const tomorrow = new Date(today.setDate(today.getDate() + 1))
        expect(
            planService.canCreateProgram(
                { username: 'foo', password: 'bar', role: 'Representative', id: 'sfwef' },
                {
                    id: 1,
                    title: 'Oromie',
                    description: '',
                    programs: [],
                    deadline: tomorrow,
                }
            )
        ).toBe(true)
    })
})
