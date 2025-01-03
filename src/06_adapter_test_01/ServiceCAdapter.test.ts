import { PAYMENT_MESSAGES } from "./constants";

import { IPaymentProvider } from "./IPaymentProvider";

import { IPaymentResult } from "./IPaymentResult";

import { ServiceCAdapter } from "./ServiceCAdapter";

const mockServiceSuccess = {
    payWithToken: jest.fn(() => true),
};

const mockServiceFailure = {
    payWithToken: jest.fn(() => false),
};

const mockMessageThrown = 'ServiceC is down';

const mockServiceThrown = {
    payWithToken: jest.fn(() => {
        throw new Error(mockMessageThrown);
    }),
};

describe('ServiceCAdapter', () => {

    test('ServiceCAdapter :: success', () => {
        const provider: IPaymentProvider = new ServiceCAdapter(mockServiceSuccess);

        const payment: IPaymentResult = provider.pay(100, 'USD');

        expect(payment.success).toBe(true);

        expect(payment.message).toBe(PAYMENT_MESSAGES.SUCCESS);
    });


    test('ServiceCAdapter :: failure', () => {
        const provider: IPaymentProvider = new ServiceCAdapter(mockServiceFailure);

        const payment: IPaymentResult = provider.pay(100, 'USD');

        expect(payment.success).toBe(false);

        expect(payment.message).toBe(PAYMENT_MESSAGES.FAILED);
    });


    test('ServiceCAdapter :: failure', () => {
        const provider: IPaymentProvider = new ServiceCAdapter(mockServiceThrown);

        const payment: IPaymentResult = provider.pay(100, 'USD');

        expect(payment.success).toBe(false);

        expect(payment.message).toBe(mockMessageThrown);
    });

});
