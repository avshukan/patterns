import type { IPayment } from "../types";

import { MethodTypeRule } from "../rules/method-type-rule";

import { UserTypeRule } from "../rules/user-type-rule";

import rulesComposer from "./rules-composer";


describe("Payment Rules Chain", () => {
    const userTypeRule = new UserTypeRule();

    const methodTypeRule = new MethodTypeRule();

    const rulesChain = rulesComposer([
        userTypeRule,
        methodTypeRule,
    ]);

    it("should correctly calculate fee for premium user with Mastercard", () => {
        const initialAmount = 200;

        const expectedUserFee = 2; // 1% of 200

        const expectedMethodFee = 1; // 0.5% of 200

        const expectedTotalFee = expectedUserFee + expectedMethodFee;

        const payment: IPayment = {
            amount: initialAmount,
            user: "premium",
            method: "mastercard",
            date: new Date(),
            currency: "USD",
        };

        const result = rulesChain.handle(payment);

        expect(result.feeAmount).toBeCloseTo(expectedTotalFee, 2);

        expect(result.totalAmount).toBeCloseTo(initialAmount + expectedTotalFee, 2);
    });

    it("should correctly calculate fee for regular user with Visa", () => {
        const payment: IPayment = {
            amount: 150,
            user: "regular",
            method: "visa",
            date: new Date(),
            currency: "USD",
        };

        const result = rulesChain.handle(payment);

        const expectedUserFee = 3; // 2% of 150

        const expectedMethodFee = 0; // Visa no fee

        const totalFee = expectedUserFee + expectedMethodFee;

        expect(result.feeAmount).toBeCloseTo(totalFee, 2);

        expect(result.totalAmount).toBeCloseTo(150 + totalFee, 2);
    });

    it("no rules should throw an error", () => {
        expect(() => {
            rulesComposer([]);
        }).toThrow("No rules provided");
    });
});
