import { IValidationResult, IValidationStrategy } from "./ValidationStrategy";


export class PhoneValidationStrategy implements IValidationStrategy<string> {
    validate(input: string): IValidationResult {
        const isValid = /^\d{10}$/.test(input);

        const result: IValidationResult = {
            isValid,
            message: isValid ? "" : "Invalid phone number"
        };

        return result;
    }
}
