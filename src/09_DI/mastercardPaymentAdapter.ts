import { IMasterCardPaymentService, IPaymentRequest, IPaymentService } from "./interfaces";

export class MastercardPaymentAdapter implements IPaymentService {
    constructor(private readonly _service: IMasterCardPaymentService) { }

    async processPayment(request: IPaymentRequest): Promise<boolean> {
        const result = await this._service.pay(
            request.orderId,
            request.amount,
            new Date().toISOString(),
            'payment'
        );

        return result.success;
    }
}
