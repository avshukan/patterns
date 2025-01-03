import { PAYMENT_MESSAGES } from "./constants";

import { handleServiceError } from "./handleServiceError";

import { IPaymentProvider } from "./IPaymentProvider";

import { IPaymentResult } from "./IPaymentResult";

import { ServiceC } from "./ServiceC";

export class ServiceCAdapter implements IPaymentProvider {
    constructor(
        private readonly _service: ServiceC,
        private readonly _token = 'static_token',
        private readonly _allowedCurrency = 'USD',
    ) { }

    public pay(amount: number, currency: string): IPaymentResult {
        if (currency !== this._allowedCurrency) {
            return {
                success: false,
                message: PAYMENT_MESSAGES.CURRENCY_NOT_ALLOWED,
            };
        }

        try {
            const response = this._service.payWithToken(this._token, amount);

            const result: IPaymentResult = {
                success: response,
                message: response ? PAYMENT_MESSAGES.SUCCESS : PAYMENT_MESSAGES.FAILED,
            };

            return result;
        } catch (error) {
            return handleServiceError(error);
        }
    }
}