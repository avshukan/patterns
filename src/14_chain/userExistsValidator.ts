import { inject, injectable } from "inversify";

import { IUserRepositoryToken } from "./diTokens";

import type { IUser, IUserRepository } from "./types";

import { ErrorCodes, ErrorMessages } from "./errorCodes";

import { Handler } from "./handler";

import { ValidationError } from "./validationError";


@injectable()
export class UserExistsValidator extends Handler {
    constructor(
        @inject(IUserRepositoryToken) private readonly userRepository: IUserRepository
    ) {
        super();
    }

    async handle(user: IUser): Promise<boolean> {
        const existingUser = await this.userRepository.getUser(user.username);

        if (existingUser) {
            throw new ValidationError(ErrorCodes.USER_ALREADY_EXISTS, ErrorMessages[ErrorCodes.USER_ALREADY_EXISTS]);
        }

        if (this.nextHandler) {
            return this.nextHandler.handle(user);
        }

        return true;
    }
}
