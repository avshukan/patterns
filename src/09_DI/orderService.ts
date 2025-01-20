import "reflect-metadata";

import { injectable, inject } from "inversify";

import { INotificationService, IOrder, IOrderService, IPaymentService } from "./interfaces";

import {
    INotificationServiceToken,
    PaymentServiceFactoryToken
} from "./diTokens";

import { PaymentServiceFactory } from "./paymentServiceFactory";

@injectable()
export class OrderService implements IOrderService {

    constructor(
        @inject(PaymentServiceFactoryToken) private readonly _paymentServiceFactory: PaymentServiceFactory,
        @inject(INotificationServiceToken) private readonly _notificationService: INotificationService
    ) { }

    async placeOrder(order: IOrder): Promise<void> {
        const paymentService: IPaymentService = this._paymentServiceFactory.create(order.paymentService);

        const request = {
            orderId: order.id,
            amount: order.total,
            paymentService: order.paymentService ?? 'visa'
        };

        const paymentSuccess = await paymentService.processPayment(request);

        if (paymentSuccess) {
            this._notificationService.sendNotification(order.id);
        }
    }
}
