import { FormValidator } from "./FormValidator";

import { IValidationResult, IValidationStrategy } from "./ValidationStrategy";

const mockInput = "email@example.com";

const mockStrategy: IValidationStrategy<string | number> = {
    validate(input: string | number): IValidationResult {
        const isValid = input === mockInput;

        const result = {
            isValid,
            message: isValid ? "" : "Invalid input"
        };

        return result;
    }
};

describe('FormValidator', () => {

    test('FormValidator :: success', () => {
        const validator = new FormValidator();

        validator.setValidationStrategy(mockStrategy);

        expect(validator.validateInput(mockInput).isValid).toBe(true);
    });

    test('FormValidator :: failure', () => {
        const validator = new FormValidator();

        validator.setValidationStrategy(mockStrategy);

        expect(validator.validateInput(5).isValid).toBe(false);
    });

    test('FormValidator :: throw', () => {
        const validator = new FormValidator();

        expect(() => validator.validateInput(mockInput)).toThrow();
    });
});
