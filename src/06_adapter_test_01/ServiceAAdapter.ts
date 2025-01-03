import { handleServiceError } from "./handleServiceError";

import { IPaymentProvider } from "./IPaymentProvider";

import { IPaymentResult } from "./IPaymentResult";

import { ServiceA } from "./ServiceA";

export class ServiceAAdapter implements IPaymentProvider {
    constructor(private readonly _service: ServiceA) { }

    public pay(amount: number, currency: string): IPaymentResult {
        try {
            const response = this._service.makePayment(amount, currency);

            const result: IPaymentResult = {
                success: true,
                message: response
            };

            return result;
        } catch (error) {
            return handleServiceError(error);
        }
    }
}
