import { IPaymentProvider } from "./IPaymentProvider";

import { IPaymentResult } from "./IPaymentResult";

import { ServiceBAdapter } from "./ServiceBAdapter";

const mockMessageSuccess = 'txn_123';

const mockServiceSuccess = {
    processPayment: jest.fn(() => ({
        status: 'success',
        transactionId: mockMessageSuccess,
    })),
};

const mockMessageFailure = 'txn_456';

const mockServiceFailure = {
    processPayment: jest.fn(() => ({
        status: 'error',
        transactionId: mockMessageFailure,
    })),
};

const mockMessageThrown = 'Service is down';

const mockServiceThrown = {
    processPayment: jest.fn(() => {
        throw new Error(mockMessageThrown);
    }),
};

describe('ServiceBAdapter', () => {

    test('ServiceBAdapter :: success', () => {
        const provider: IPaymentProvider = new ServiceBAdapter(mockServiceSuccess);

        const payment: IPaymentResult = provider.pay(100, 'USD');

        expect(payment.success).toBe(true);

        expect(payment.message).toBe(mockMessageSuccess);
    });


    test('ServiceBAdapter :: failure', () => {
        const provider: IPaymentProvider = new ServiceBAdapter(mockServiceFailure);

        const payment: IPaymentResult = provider.pay(100, 'USD');

        expect(payment.success).toBe(false);

        expect(payment.message).toBe(mockMessageFailure);
    });


    test('ServiceBAdapter :: thrown', () => {
        const provider: IPaymentProvider = new ServiceBAdapter(mockServiceThrown);

        const payment: IPaymentResult = provider.pay(100, 'USD');

        expect(payment.success).toBe(false);

        expect(payment.message).toBe(mockMessageThrown);
    });

});
