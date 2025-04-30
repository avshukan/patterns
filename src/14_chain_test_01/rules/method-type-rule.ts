import { injectable } from "inversify";

import type {
    IPayment,
    IPaymentResult,
    MethodType,
} from "../types";

import { BasePaymentRule } from "../base-payment-rule";

const mastercardMethodRule = (payment: IPayment): IPaymentResult => {
    const FEE_AMOUNT = 0.005;

    const fee = payment.amount * FEE_AMOUNT;

    const paymentResult: IPaymentResult = {
        originalAmount: payment.amount,
        feeAmount: fee,
        totalAmount: payment.amount + fee,
    };

    return paymentResult;
};

const defaultMethodRule = (payment: IPayment): IPaymentResult => {
    const FEE_AMOUNT = 0;

    const fee = payment.amount * FEE_AMOUNT;

    const paymentResult: IPaymentResult = {
        originalAmount: payment.amount,
        feeAmount: fee,
        totalAmount: payment.amount + fee,
    };

    return paymentResult;
}

const methodRule: Record<MethodType, (payment: IPayment) => IPaymentResult> = {
    'visa': defaultMethodRule,
    'mastercard': mastercardMethodRule,
    'paypal': defaultMethodRule,
}

@injectable()
export class MethodTypeRule extends BasePaymentRule {
    applyRule(payment: IPayment): IPaymentResult {
        let rule = methodRule[payment.method] ?? defaultMethodRule;

        const paymentResult = rule(payment);

        return paymentResult;
    }
}
