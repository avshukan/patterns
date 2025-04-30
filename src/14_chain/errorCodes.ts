// errors/errorCodes.ts
export const ErrorCodes = {
    EMPTY_USERNAME: 'EMPTY_USERNAME',
    INVALID_EMAIL: 'INVALID_EMAIL',
    SHORT_PASSWORD: 'SHORT_PASSWORD',
    USER_ALREADY_EXISTS: 'USER_ALREADY_EXISTS',
} as const;

export const ErrorMessages: Record<(typeof ErrorCodes)[keyof typeof ErrorCodes], string> = {
    [ErrorCodes.EMPTY_USERNAME]: 'Username must not be empty.',
    [ErrorCodes.INVALID_EMAIL]: 'Email is invalid.',
    [ErrorCodes.SHORT_PASSWORD]: 'Password must be at least 8 characters long.',
    [ErrorCodes.USER_ALREADY_EXISTS]: 'Username is already taken.',
};
