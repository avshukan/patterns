import type { IPayment } from "../types";

import { UserTypeRule } from "./user-type-rule";


describe("UserTypeRule", () => {
    const rule = new UserTypeRule();

    it("should apply 2% fee for regular users", () => {
        const payment: IPayment = {
            amount: 100,
            user: "regular",
            method: "visa",
            date: new Date(),
            currency: "USD",
        };

        const result = rule.applyRule(payment);

        expect(result.feeAmount).toBe(2);
        expect(result.totalAmount).toBe(102);
    });

    it("should apply 1% fee for premium users", () => {
        const payment: IPayment = {
            amount: 100,
            user: "premium",
            method: "visa",
            date: new Date(),
            currency: "USD",
        };

        const result = rule.applyRule(payment);

        expect(result.feeAmount).toBe(1);
        expect(result.totalAmount).toBe(101);
    });

    it("should throw error for unknown user type", () => {
        const payment: IPayment = {
            amount: 100,
            user: "unknown" as any,
            method: "visa",
            date: new Date(),
            currency: "USD",
        };

        expect(() => rule.applyRule(payment)).toThrow('No rule found for user type: unknown');
    });
});
