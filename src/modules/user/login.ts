import { User, users } from '../../routes/user.route'
import { HttpError } from '../../utility/http-error'
import { LoginDto } from './dto/login.dto'

export const login = (dto: LoginDto): User => {
    const user = users.find((a) => a.username == dto.username && a.password == dto.password)
    if (!user) {
        throw new HttpError(401, 'Invalid username or password')
    }
    return user
}
