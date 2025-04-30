import { injectable } from "inversify";

import type { IUser } from "./types";

import { ErrorCodes, ErrorMessages } from "./errorCodes";

import { Handler } from "./handler";

import { ValidationError } from "./validationError";


@injectable()
export class PasswordValidator extends Handler {
    private static readonly MIN_PASSWORD_LENGTH = 8;

    async handle(user: IUser): Promise<boolean> {
        if (user.password.length < PasswordValidator.MIN_PASSWORD_LENGTH) {
            throw new ValidationError(ErrorCodes.SHORT_PASSWORD, ErrorMessages[ErrorCodes.SHORT_PASSWORD]);
        }

        if (this.nextHandler) {
            return this.nextHandler.handle(user);
        }

        return true;
    }
}
