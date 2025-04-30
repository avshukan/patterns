import {
    IPayment,
    IPaymentContext,
    IPaymentResult,
    IPaymentRule
} from "./types";


export abstract class BasePaymentRule implements IPaymentRule {
    private _nextRule: IPaymentRule | null = null;

    getNext(): IPaymentRule | null {
        return this._nextRule;
    }

    setNext(nextRule: IPaymentRule): void {
        const currentNextRule = this.getNext();

        if (currentNextRule) {
            currentNextRule.setNext(nextRule);

            return;
        }

        this._nextRule = nextRule;
    }

    handle(payment: IPayment): IPaymentResult {
        const paymentContext = this.makeContext(payment);

        const contextResult = this.handleContext(paymentContext);

        const paymentResult: IPaymentResult = {
            originalAmount: contextResult.payment.amount,
            feeAmount: contextResult.feeAmount,
            totalAmount: contextResult.payment.amount + contextResult.feeAmount,
        };

        return paymentResult;
    }

    protected makeContext(payment: IPayment): IPaymentContext {
        return {
            payment,
            feeAmount: 0,
            appliedRules: [],
            interruptedBy: undefined,
            metadata: {},
        };
    }

    protected hasInterruption(payment: IPayment): boolean {
        return false;
    }

    shouldApply(payment: IPayment): boolean {
        return true;
    }

    abstract applyRule(payment: IPayment): IPaymentResult;

    protected handleContext(paymentContext: IPaymentContext): IPaymentContext {
        const payment = paymentContext.payment;

        const shouldApply = this.shouldApply(payment);

        const next: IPaymentRule | null = this.getNext();

        if (!shouldApply) {
            if (next) {
                return (next as BasePaymentRule).handleContext(paymentContext);
            }
            
            return paymentContext;
        }

        const result = this.applyRule(payment);

        const hasInterruption = this.hasInterruption(payment);

        const newPaymentContext: IPaymentContext = {
            ...paymentContext,
            payment: {
                ...payment,
            },
            feeAmount: paymentContext.feeAmount + result.feeAmount,
            interruptedBy: hasInterruption ? this.constructor.name : undefined,
            appliedRules: [...paymentContext.appliedRules, this.constructor.name],
        };

        if (hasInterruption || !next) {
            return newPaymentContext;
        }

        const nextHandleContext = (next as BasePaymentRule).handleContext(newPaymentContext);

        return nextHandleContext;
    };
}
