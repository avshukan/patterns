import { IValidationResult, IValidationStrategy } from "./ValidationStrategy";


export class NameValidationStrategy implements IValidationStrategy<string> {
    validate(input: string): IValidationResult {
        const isValid = /^[a-zA-Z\s]+$/.test(input);

        const result: IValidationResult = {
            isValid,
            message: isValid ? "" : "Invalid name"
        };

        return result;
    }
}
