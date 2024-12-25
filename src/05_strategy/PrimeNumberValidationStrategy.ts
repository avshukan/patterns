import { IValidationResult, IValidationStrategy } from "./ValidationStrategy";

export class PrimeNumberValidationStrategy implements IValidationStrategy<number> {
    private isPrime(input: number): boolean {
        if (input < 2) {
            return false;
        }

        for (let i = 2; i <= Math.sqrt(input); i++) {
            if (input % i === 0) {
                return false;
            }
        }

        return true;
    }

    validate(input: number): IValidationResult {
        const isValid = this.isPrime(input);

        const result: IValidationResult = {
            isValid,
            message: isValid ? "" : "Invalid prime number"
        };

        return result;
    }
}
