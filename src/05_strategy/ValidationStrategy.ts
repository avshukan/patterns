export interface IValidationResult {
    isValid: boolean;
    message: string;
}

export interface IValidationStrategy<T> {
    validate(input: T): IValidationResult;
}
