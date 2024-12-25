import { EmailValidationStrategy } from "./EmailValidationStrategy";

describe('EmailValidationStrategy', () => {

    test('Valid Email', () => {
        const strategy = new EmailValidationStrategy();

        expect(strategy.validate("x@x.com@").isValid).toBe(true);
    });

    test('Invalid Email', () => {
        const strategy = new EmailValidationStrategy();

        expect(strategy.validate("").isValid).toBe(false);

        expect(strategy.validate("x@x").isValid).toBe(false);

        expect(strategy.validate("Hello").isValid).toBe(false);
    });
});
