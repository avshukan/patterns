import { injectable } from "inversify";

import type {
    IPayment,
    IPaymentResult,
    UserType
} from "../types";

import { BasePaymentRule } from "../base-payment-rule";

const ordinaryUserRule = (payment: IPayment): IPaymentResult => {
    const FEE_AMOUNT = 0.02;

    const fee = payment.amount * FEE_AMOUNT;

    const paymentResult: IPaymentResult = {
        originalAmount: payment.amount,
        feeAmount: fee,
        totalAmount: payment.amount + fee,
    };

    return paymentResult;
};

const premiumUserRule = (payment: IPayment): IPaymentResult => {
    const FEE_AMOUNT = 0.01;

    const fee = payment.amount * FEE_AMOUNT;

    const paymentResult: IPaymentResult = {
        originalAmount: payment.amount,
        feeAmount: fee,
        totalAmount: payment.amount + fee,
    };

    return paymentResult;
}

const userRule: Record<UserType, (payment: IPayment) => IPaymentResult> = {
    'regular': ordinaryUserRule,
    'premium': premiumUserRule,
}

@injectable()
export class UserTypeRule extends BasePaymentRule {
    applyRule(payment: IPayment): IPaymentResult {
        const rule = userRule[payment.user];

        if (!rule) {
            throw new Error(`No rule found for user type: ${payment.user}`);
        }

        const paymentResult = rule(payment);

        return paymentResult;
    }
}
