import { IValidationResult, IValidationStrategy } from "./ValidationStrategy";

export class FormValidator<T> {
    private validationStrategy: IValidationStrategy<T> | null = null;

    public setValidationStrategy(validationStrategy: IValidationStrategy<T>): void {
        this.validationStrategy = validationStrategy;
    }

    public validateInput(input: T): IValidationResult {
        if (!this.validationStrategy) {
            throw new Error("Validation strategy must be provided");
        }

        return this.validationStrategy.validate(input);
    }
}
