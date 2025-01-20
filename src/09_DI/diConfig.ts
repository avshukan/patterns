import "reflect-metadata";

import { Container } from "inversify";

import { NotificationService } from "./notificationService";

import { OrderService } from "./orderService";

import {
    IMasterCardPaymentService,
    INotificationService,
    IOrderService,
    IVisaPaymentService,
} from "./interfaces";

import {
    IMastercardPaymentServiceToken,
    INotificationServiceToken,
    IOrderServiceToken,
    IVisaPaymentServiceToken,
    PaymentServiceFactoryToken,
} from "./diTokens";

import { MastercardPaymentService } from "./mastercardPaymentService";

import { VisaPaymentService } from "./visaPaymentService";

import { PaymentServiceFactory } from "./paymentServiceFactory";

export const container = new Container();

container.bind<IMasterCardPaymentService>(IMastercardPaymentServiceToken).to(MastercardPaymentService);

container.bind<IVisaPaymentService>(IVisaPaymentServiceToken).to(VisaPaymentService);

container.bind<INotificationService>(INotificationServiceToken).to(NotificationService);

container.bind<IOrderService>(IOrderServiceToken).to(OrderService);

container.bind<PaymentServiceFactory>(PaymentServiceFactoryToken).to(PaymentServiceFactory);
