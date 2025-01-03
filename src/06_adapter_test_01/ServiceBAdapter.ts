import { handleServiceError } from "./handleServiceError";

import { IPaymentProvider } from "./IPaymentProvider";

import { IPaymentResult } from "./IPaymentResult";

import { ServiceB } from "./ServiceB";


export class ServiceBAdapter implements IPaymentProvider {
    constructor(private readonly _service: ServiceB, private readonly _user_id = 'static_user') { }

    public pay(amount: number, currency: string): IPaymentResult {
        const details = {
            price: amount,
            currencyCode: currency,
            userId: this._user_id
        };

        try {
            const { status, transactionId } = this._service.processPayment(details);

            const result: IPaymentResult = {
                success: status === "success",
                message: transactionId
            };

            return result;
        } catch (error) {
            return handleServiceError(error);
        }
    }
}