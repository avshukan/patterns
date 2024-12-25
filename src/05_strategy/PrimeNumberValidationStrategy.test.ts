import { PrimeNumberValidationStrategy } from "./PrimeNumberValidationStrategy";

describe('PrimeNumberValidationStrategy', () => {

    test('Valid Email', () => {
        const strategy = new PrimeNumberValidationStrategy();

        expect(strategy.validate(5).isValid).toBe(true);

        expect(strategy.validate(13).isValid).toBe(true);
    });

    test('Invalid Email', () => {
        const strategy = new PrimeNumberValidationStrategy();

        expect(strategy.validate(-1).isValid).toBe(false);

        expect(strategy.validate(0).isValid).toBe(false);

        expect(strategy.validate(1).isValid).toBe(false);

        expect(strategy.validate(4).isValid).toBe(false);

        expect(strategy.validate(10).isValid).toBe(false);
    });
});
