import type { IPayment } from "./types";

import { BasePaymentRule } from "./base-payment-rule";


class FakeRule extends BasePaymentRule {
    constructor(private fee: number, private interrupt = false) {
        super();
    }

    override hasInterruption(): boolean {
        return this.interrupt;
    }

    override applyRule(payment: IPayment) {
        return {
            originalAmount: payment.amount,
            feeAmount: this.fee,
            totalAmount: payment.amount + this.fee,
        };
    }
}

describe("BasePaymentRule", () => {
    const basePayment: IPayment = {
        amount: 100,
        user: "regular",
        method: "visa",
        date: new Date(),
        currency: "USD",
    };

    it("should apply a single rule", () => {
        const rule = new FakeRule(5);

        const result = rule.handle(basePayment);

        expect(result.feeAmount).toBe(5);

        expect(result.totalAmount).toBe(105);
    });

    it("should apply multiple chained rules", () => {
        const rule1 = new FakeRule(5);

        const rule2 = new FakeRule(2);

        rule1.setNext(rule2);

        const result = rule1.handle(basePayment);

        expect(result.feeAmount).toBe(7);

        expect(result.totalAmount).toBe(107);
    });

    it("should stop chain if interrupted", () => {
        const rule1 = new FakeRule(5, true);

        const rule2 = new FakeRule(10);

        rule1.setNext(rule2);

        const result = rule1.handle(basePayment);

        expect(result.feeAmount).toBe(5);

        expect(result.totalAmount).toBe(105);
    });

    it("should accumulate appliedRules correctly", () => {
        const rule1 = new FakeRule(5);

        const rule2 = new FakeRule(2);

        rule1.setNext(rule2);

        const context = (rule1 as any).handleContext((rule1 as any).makeContext(basePayment));

        expect(context.appliedRules).toEqual(["FakeRule", "FakeRule"]);

        expect(context.interruptedBy).toBeUndefined();
    });

    it("should set interruptedBy when interrupted", () => {
        const rule1 = new FakeRule(5, true);

        const rule2 = new FakeRule(2);

        rule1.setNext(rule2);

        const context = (rule1 as any).handleContext((rule1 as any).makeContext(basePayment));

        expect(context.interruptedBy).toBe("FakeRule");
    });

    it("should correctly link three chained rules", () => {
        const rule1 = new FakeRule(1);

        const rule2 = new FakeRule(2);

        const rule3 = new FakeRule(3);

        rule1.setNext(rule2);

        rule1.setNext(rule3);

        expect(rule1.getNext()).toBe(rule2);

        expect(rule2.getNext()).toBe(rule3);

        expect(rule3.getNext()).toBeNull();
    });
});
