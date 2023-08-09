import { User } from './model/user'
import { v4 } from 'uuid'

export class UserRepository {
    private users: User[] = [
        { id: v4(), username: 'admin', password: 'admin', role: 'Admin' },
        { id: v4(), username: 'rep', password: 'rep', role: 'Representative' },
    ]

    public findByCredentials(username: string, password: string) {
        return this.users.find((a) => a.username === username && a.password === password)
    }

    public findById(id: string) {
        return this.users.find((a) => a.id === id)
    }
}
