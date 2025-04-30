import { injectable } from "inversify";

import type {
    IPayment,
    IPaymentResult,
} from "../types";

import { BasePaymentRule } from "../base-payment-rule";

import { isWeekend } from "./utils";


@injectable()
export class DateTypeRule extends BasePaymentRule {
    override hasInterruption(payment: IPayment): boolean {
        return isWeekend(payment.date);
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
