export class HttpError extends Error {
    constructor(public status: number, message: string) {
        super(message)
    }
}

export class ForbiddenError extends HttpError {
    constructor() {
        super(403, 'Forbidden')
    }
}

export class NotFoundError extends HttpError {
    constructor() {
        super(404, 'Not Found')
    }
}

export class UnauthorizedError extends HttpError {
    constructor() {
        super(401, 'Unauthorized')
    }
}
