import { PhoneValidationStrategy } from "./PhoneValidationStrategy";

describe('PhoneValidationStrategy', () => {

    test('Valid phone', () => {
        const phoneStrategy = new PhoneValidationStrategy();

        expect(phoneStrategy.validate("1234567890").isValid).toBe(true);

        expect(phoneStrategy.validate("9131237854").isValid).toBe(true);
    });

    test('Invalid phone', () => {
        const phoneStrategy = new PhoneValidationStrategy();

        expect(phoneStrategy.validate("").isValid).toBe(false);

        expect(phoneStrategy.validate("123").isValid).toBe(false);

        expect(phoneStrategy.validate("abcdefghi").isValid).toBe(false);
    });
});
