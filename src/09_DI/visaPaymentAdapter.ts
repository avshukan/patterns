import { IPaymentRequest, IPaymentService, IVisaPaymentService } from "./interfaces";

export class VisaPaymentAdapter implements IPaymentService {
    constructor(private readonly _service: IVisaPaymentService) { }

    async processPayment(request: IPaymentRequest): Promise<boolean> {
        const result = await this._service.processPayment(request.orderId, request.amount);

        return result;
    }
}
