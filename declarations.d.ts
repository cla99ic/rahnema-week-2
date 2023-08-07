declare namespace Express {
    export interface Request {
        user?: import('./src/repository/user').IUser
    }
}
