import { injectable } from "inversify";

import type { IUser } from "./types";

import { ErrorCodes, ErrorMessages } from "./errorCodes";

import { Handler } from "./handler";

import { ValidationError } from "./validationError";


@injectable()
export class UsernameValidator extends Handler {
    async handle(user: IUser): Promise<boolean> {
        if (user.username.trim().length < 1) {
            throw new ValidationError(ErrorCodes.EMPTY_USERNAME, ErrorMessages[ErrorCodes.EMPTY_USERNAME]);
        }

        if (this.nextHandler) {
            return this.nextHandler.handle(user);
        }

        return true;
    }
}
