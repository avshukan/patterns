import type { IPayment } from "../types";

import { Usd1kSpecialTypeRule } from "./usd1k-special-type-rule";

describe("Usd1kSpecialTypeRule", () => {
    const rule1 = new Usd1kSpecialTypeRule();

    const rule2 = new Usd1kSpecialTypeRule();

    rule1.setNext(rule2);

    const spyApplyRule1 = jest.spyOn(rule1, "applyRule");

    const spyApplyRule2 = jest.spyOn(rule2, "applyRule");


    it("should apply next rule if amount > 1000USD", () => {
        const payment: IPayment = {
            amount: 10000,
            user: "regular",
            method: "visa",
            date: new Date("2023-10-09"),
            currency: "USD",
        };

        rule1.handle(payment);

        expect(spyApplyRule1).toHaveBeenCalledWith(payment);

        expect(spyApplyRule2).not.toHaveBeenCalledWith(payment);

        expect(rule1.hasInterruption(payment)).toBe(true);
    });

    it("should not apply if amount < 1000USD", () => {
        const payment: IPayment = {
            amount: 100,
            user: "regular",
            method: "visa",
            date: new Date("2023-10-08"), // Sunday
            currency: "ESD",
        };

        rule1.handle(payment);

        expect(spyApplyRule1).not.toHaveBeenCalledWith();

        expect(spyApplyRule2).not.toHaveBeenCalledWith();

        expect(rule1.hasInterruption(payment)).toBe(false);
    });

    it("should not apply if currency is not USD", () => {
        const payment: IPayment = {
            amount: 10000,
            user: "regular",
            method: "visa",
            date: new Date("2023-10-08"), // Sunday
            currency: "EUR",
        };

        rule1.handle(payment);

        expect(spyApplyRule1).not.toHaveBeenCalledWith();

        expect(spyApplyRule2).not.toHaveBeenCalledWith();

        expect(rule1.hasInterruption(payment)).toBe(false);
    });

});
