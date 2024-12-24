import { CreditCardPayment } from "./creditCardPayment"

import { PayPalPayment } from './payPalPayment';

import { Payment } from "./payment";

const paymentProcessorsMap: { [key: string]: Payment } = {
    'credit_card': new CreditCardPayment(),
    'paypal': new PayPalPayment(),
};

export function getPaymentProcessorByType(method: string) {
    const paymentProcessor: Payment = paymentProcessorsMap[method];

    if (!paymentProcessor) {
        throw new Error('Unsupported payment method');
    }

    return paymentProcessor;
}
