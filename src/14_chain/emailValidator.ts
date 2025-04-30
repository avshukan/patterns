
import { injectable } from "inversify";

import type { IUser } from "./types";

import { ErrorCodes, ErrorMessages } from "./errorCodes";

import { Handler } from "./handler";

import { ValidationError } from "./validationError";

@injectable()
export class EmailValidator extends Handler {
    async handle(user: IUser): Promise<boolean> {
        const emailRegex = /^\S+@\S+\.\S+$/;

        if (!emailRegex.test(user.email)) {
            throw new ValidationError(ErrorCodes.INVALID_EMAIL, ErrorMessages[ErrorCodes.INVALID_EMAIL]);
        }

        if (this.nextHandler) {
            return this.nextHandler.handle(user);
        }

        return true;
    }
}
