import { UnauthorizedError } from '../../utility/http-error'
import { LoginDto } from './dto/login.dto'
import { UserRepository } from './user.repository'

export class UserService {
    private userRepo: UserRepository
    constructor() {
        this.userRepo = new UserRepository()
    }

    login(dto: LoginDto) {
        const user = this.userRepo.findByCredentials(dto.username, dto.password)
        if (user === undefined) {
            throw new UnauthorizedError()
        }
        return user
    }

    authenticate(id: string) {
        const loggedInUser = this.userRepo.findById(id)

        if (!loggedInUser) {
            throw new UnauthorizedError()
        }

        return loggedInUser
    }
}
