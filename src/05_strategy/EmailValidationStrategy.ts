import { IValidationResult, IValidationStrategy } from "./ValidationStrategy";

export class EmailValidationStrategy implements IValidationStrategy<string> {
    validate(input: string): IValidationResult {
        const isValid = /\S+@\S+\.\S+/.test(input);

        const result: IValidationResult = {
            isValid,
            message: isValid ? "" : "Invalid email address"
        };

        return result;
    }
}
