import { injectable } from "inversify";

import type {
    IPayment,
    IPaymentResult,
} from "../types";

import { BasePaymentRule } from "../base-payment-rule";

const checkUsd1kCondition = (payment: IPayment): boolean => {
    const AMOUNT = 1000;
    return payment.amount >= AMOUNT && payment.currency === 'USD';
}

@injectable()
export class Usd1kSpecialTypeRule extends BasePaymentRule {
    override hasInterruption(payment: IPayment): boolean {
        return checkUsd1kCondition(payment);
    }

    override shouldApply(payment: IPayment): boolean {
        return checkUsd1kCondition(payment);
    }

    applyRule(payment: IPayment): IPaymentResult {
        const FEE_AMOUNT = 0.00;
    
        const paymentResult: IPaymentResult = {
            originalAmount: payment.amount,
            feeAmount: FEE_AMOUNT,
            totalAmount: payment.amount,
        };

        return paymentResult;
    }
}
