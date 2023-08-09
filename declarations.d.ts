declare namespace Express {
    export interface Request {
        user: import('./src/routes/user.route').User
    }
}
