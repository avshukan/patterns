import type { IPayment, MethodType } from "../types";

import { MethodTypeRule } from "./method-type-rule";


describe("MethodTypeRule", () => {
    const rule = new MethodTypeRule();

    it("should apply no fee for Visa", () => {
        const payment: IPayment = {
            amount: 100,
            user: "regular",
            method: "visa",
            date: new Date(),
            currency: "USD",
        };

        const result = rule.applyRule(payment);

        expect(result.feeAmount).toBe(0);

        expect(result.totalAmount).toBe(100);
    });

    it("should apply 0.5% fee for Mastercard", () => {
        const payment: IPayment = {
            amount: 100,
            user: "regular",
            method: "mastercard",
            date: new Date(),
            currency: "USD",
        };

        const result = rule.applyRule(payment);

        expect(result.feeAmount).toBe(0.5);

        expect(result.totalAmount).toBe(100.5);
    });

    it("should use default method when get unknown", () => {
        const payment: IPayment = {
            amount: 100,
            user: "regular",
            method: "uzcard" as MethodType,
            date: new Date(),
            currency: "USD",
        };

        const result = rule.applyRule(payment);

        expect(result.feeAmount).toBe(0);

        expect(result.totalAmount).toBe(100);
    });
});
