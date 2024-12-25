import { NameValidationStrategy } from "./NameValidationStrategy";

describe('NameValidationStrategy', () => {

    test('Valid name', () => {
        const nameStrategy = new NameValidationStrategy();

        expect(nameStrategy.validate("John").isValid).toBe(true);
    });

    test('Invalid name', () => {
        const nameStrategy = new NameValidationStrategy();

        expect(nameStrategy.validate("").isValid).toBe(false);

        expect(nameStrategy.validate("123").isValid).toBe(false);

        expect(nameStrategy.validate("John1").isValid).toBe(false);
    });
});
