import { IMasterCardPaymentService, INotificationService, IOrder, IPaymentService, IVisaPaymentService } from "./interfaces";
import { MastercardPaymentAdapter } from "./mastercardPaymentAdapter";

import { OrderService } from "./orderService";

import { PaymentServiceFactory } from "./paymentServiceFactory";

import { VisaPaymentAdapter } from "./visaPaymentAdapter";

let mockPaymentService: IPaymentService;

let mockNotificationService: INotificationService;

let mockPaymentServiceFactory: PaymentServiceFactory;

describe('Factory', () => {

    let factory: PaymentServiceFactory;

    let mockMastercardService: IMasterCardPaymentService;

    let mockVisaService: IVisaPaymentService;

    beforeEach(() => {
        mockMastercardService = {
            pay: jest.fn(),
        } as IMasterCardPaymentService;

        mockVisaService = {
            processPayment: jest.fn(),
        } as IVisaPaymentService;

        factory = new PaymentServiceFactory(mockMastercardService, mockVisaService);
    });

    test('Factory :: MC', () => {
        const service = factory.create("mastercard");

        expect(service).toBeInstanceOf(MastercardPaymentAdapter);
    });

    test('Factory :: VISA', () => {
        const service = factory.create("visa");

        expect(service).toBeInstanceOf(VisaPaymentAdapter);
    });

    test('Factory :: undefind', () => {
        const service = factory.create();

        expect(service).toBeInstanceOf(VisaPaymentAdapter);
    });
});



describe('OrderService', () => {
    beforeEach(() => {
        mockPaymentService = {
            processPayment: jest.fn(),
        } as IPaymentService;

        mockNotificationService = {
            sendNotification: jest.fn(),
        } as INotificationService;

        mockPaymentServiceFactory = {
            create: jest.fn().mockReturnValue(mockPaymentService),
            _mastercardPaymentService: mockPaymentService,
            _visaPaymentService: mockPaymentService,
        } as unknown as PaymentServiceFactory;

        jest.spyOn(console, "log").mockImplementation(() => { }); // Мокаем console.log
    });

    afterEach(() => {
        jest.restoreAllMocks(); // Восстанавливаем оригинальные функции после каждого теста
    });

    test('payment and notification', async () => {
        jest.spyOn(mockPaymentService, "processPayment").mockImplementation(async () => true); // Мокаем processPayment

        const orderService = new OrderService(mockPaymentServiceFactory, mockNotificationService);

        // jest.spyOn(mockPaymentServiceFactory, "create").mockReturnValue(mockPaymentService);

        const order: IOrder = {
            id: 1,
            total: 100,
            paymentService: 'mastercard'
        };

        await orderService.placeOrder(order);

        expect(mockPaymentService.processPayment).toHaveBeenCalledWith({
            orderId: order.id,
            amount: order.total,
            paymentService: order.paymentService
        });

        expect(mockNotificationService.sendNotification).toHaveBeenCalledWith(order.id);
    });

    test('log failure', async () => {

        jest.spyOn(mockPaymentService, "processPayment").mockImplementation(async () => false); // Мокаем processPayment

        const orderService = new OrderService(mockPaymentServiceFactory, mockNotificationService);

        // jest.spyOn(mockPaymentServiceFactory, "create").mockReturnValue(mockPaymentService);

        const order: IOrder = {
            id: 2,
            total: 200,
            paymentService: 'visa'
        };

        await orderService.placeOrder(order);

        expect(mockPaymentService.processPayment).toHaveBeenCalledWith({
            orderId: order.id,
            amount: order.total,
            paymentService: order.paymentService
        });

        expect(mockNotificationService.sendNotification).not.toHaveBeenCalled();

        // expect(console.log).not.toHaveBeenCalledWith(`Payment failed for order #${order.id}`);
        expect(console.log).not.toHaveBeenCalled();
    });
});
