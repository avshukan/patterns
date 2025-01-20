import "reflect-metadata";

import { inject, injectable } from "inversify";

import {
    IMasterCardPaymentService,
    IPaymentService,
    IVisaPaymentService,
    PaymentServiceType
} from "./interfaces";

import { IMastercardPaymentServiceToken, IVisaPaymentServiceToken } from "./diTokens";

import { MastercardPaymentAdapter } from "./mastercardPaymentAdapter";

import { VisaPaymentAdapter } from "./visaPaymentAdapter";

@injectable()
export class PaymentServiceFactory {

    constructor(
        @inject(IMastercardPaymentServiceToken) private readonly _mastercardPaymentService: IMasterCardPaymentService,
        @inject(IVisaPaymentServiceToken) private readonly _visaPaymentService: IVisaPaymentService,
    ) { }

    create(paymentServiceType?: PaymentServiceType): IPaymentService {
        switch (paymentServiceType) {
            case 'mastercard':
                return new MastercardPaymentAdapter(this._mastercardPaymentService);
            case 'visa':
            default:
                return new VisaPaymentAdapter(this._visaPaymentService);
        }
    }
}
