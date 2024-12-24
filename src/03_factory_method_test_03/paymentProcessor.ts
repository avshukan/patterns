import { getPaymentProcessorByType } from "./getPaymentProcessorByType";

export function processPayment(method: string, amount: number): void {
    const paymentProcessor = getPaymentProcessorByType(method);

    paymentProcessor.pay(amount);
}
