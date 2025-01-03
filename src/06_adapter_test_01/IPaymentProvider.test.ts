import { IPaymentProvider } from "./IPaymentProvider";

import { ServiceAAdapter } from "./ServiceAAdapter";

import { ServiceBAdapter } from "./ServiceBAdapter";

import { ServiceCAdapter } from "./ServiceCAdapter";

const runProviderTest = (provider: IPaymentProvider) => {
    const result = provider.pay(100, 'USD');
    expect(result).toHaveProperty('success');
    expect(result).toHaveProperty('message');
};

describe('IPaymentProvider Tests', () => {
    test('ServiceAAdapter', () => {
        const mockServiceA = {
            makePayment: jest.fn(() => 'Success'),
        };
        runProviderTest(new ServiceAAdapter(mockServiceA as any));
    });

    test('ServiceBAdapter', () => {
        const mockServiceB = {
            processPayment: jest.fn(() => ({ status: 'success', transactionId: 'txn123' })),
        };
        runProviderTest(new ServiceBAdapter(mockServiceB as any));
    });

    test('ServiceCAdapter', () => {
        const mockServiceC = {
            payWithToken: jest.fn(() => true),
        };
        runProviderTest(new ServiceCAdapter(mockServiceC as any));
    });
});
