export class AppError extends Error {
    public status: number;

    constructor(message: string, status: number = 500) {
        super(message);
        this.status = status;
        Object.setPrototypeOf(this, AppError.prototype);
    }

    static badRequest(msg: string) { return new AppError(msg, 400); }
    static unauthorized(msg: string) { return new AppError(msg, 401); }
    static forbidden(msg: string) { return new AppError(msg, 403); }
    static notFound(msg: string) { return new AppError(msg, 404); }
    static internal(msg: string) { return new AppError(msg, 500); }
}
