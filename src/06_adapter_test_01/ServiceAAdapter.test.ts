import { IPaymentProvider } from "./IPaymentProvider";

import { IPaymentResult } from "./IPaymentResult";

import { ServiceAAdapter } from "./ServiceAAdapter";

const mockServiceSuccess = {
    makePayment: jest.fn((amount: number, currency: string) =>
        `Payment of ${amount} ${currency} processed via ServiceA`
    ),
};

const mockFailureMessage = 'ServiceA is down';

const mockServiceFailure = {
    makePayment: jest.fn((amount: number, currency: string) => {
        throw new Error(mockFailureMessage);
    }),
};

const mockMessageThrown = 'Service is down';

const mockServiceThrown = {
    makePayment: jest.fn((amount: number, currency: string) => {
        throw new Error(mockMessageThrown);
    }),
};


describe('ServiceAAdapter', () => {

    test('ServiceAAdapter :: success', () => {
        const provider: IPaymentProvider = new ServiceAAdapter(mockServiceSuccess);

        const payment: IPaymentResult = provider.pay(100, 'USD');

        expect(payment.success).toBe(true);

        expect(payment.message).toBe('Payment of 100 USD processed via ServiceA');
    });


    test('ServiceAAdapter :: failure', () => {
        const provider: IPaymentProvider = new ServiceAAdapter(mockServiceFailure);

        const payment: IPaymentResult = provider.pay(100, 'USD');

        expect(payment.success).toBe(false);

        expect(payment.message).toBe(mockFailureMessage);
    });


    test('ServiceAAdapter :: thrown', () => {
        const provider: IPaymentProvider = new ServiceAAdapter(mockServiceThrown);

        const payment: IPaymentResult = provider.pay(100, 'USD');

        expect(payment.success).toBe(false);

        expect(payment.message).toBe(mockMessageThrown);
    });

});
