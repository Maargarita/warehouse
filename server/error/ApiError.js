class ApiError extends Error {
    constructor (status, message, error) {
        super()
        this.status = status
        this.message = message
        this.error = error
    }

    static badRequest (message, error) {
        return new ApiError(400, message, error)
    }

    static unauthorized (message, error) {
        return new ApiError(401, message, error)
    }

    static conflict (message, error) {
        return new ApiError(409, message, error)
    }

    static internal (message, error) {
        return new ApiError(500, message, error)
    }

    static forbidden (message, error) {
        return new ApiError(403, message, error)
    }

    static notFound (message, error) {
        return new ApiError(404, message, error)
    }
}

module.exports = ApiError