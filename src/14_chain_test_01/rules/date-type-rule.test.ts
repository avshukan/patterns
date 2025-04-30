import type { IPayment } from "../types";

import { DateTypeRule } from "./date-type-rule";

describe("DateTypeRule", () => {
    const rule1 = new DateTypeRule();

    const rule2 = new DateTypeRule();

    rule1.setNext(rule2);

    const spyApplyRule2 = jest.spyOn(rule2, "applyRule");

    it.each([{
        paymentDate: "2023-10-08", // Sunday
        expectedInterruption: true
    }, {
        paymentDate: "2023-10-09", // Monday
        expectedInterruption: false
    }, {
        paymentDate: "2023-10-10", // Tuesday
        expectedInterruption: false
    }, {
        paymentDate: "2023-10-11", // Wednesday
        expectedInterruption: false
    }, {
        paymentDate: "2023-10-12", // Thursday
        expectedInterruption: false
    }, {
        paymentDate: "2023-10-13", // Friday
        expectedInterruption: false
    }, {
        paymentDate: "2023-10-14", // Saturday
        expectedInterruption: true
    }])("should apply no fee for any day", ({ paymentDate, expectedInterruption }) => {
        const payment: IPayment = {
            amount: 100,
            user: "regular",
            method: "visa",
            date: new Date(paymentDate),
            currency: "USD",
        };

        const result = rule1.applyRule(payment);

        expect(result.feeAmount).toBe(0);

        expect(rule1.hasInterruption(payment)).toBe(expectedInterruption);
    });

    it("should apply next rule for common days", () => {
        const payment: IPayment = {
            amount: 100,
            user: "regular",
            method: "visa",
            date: new Date("2023-10-09"), // Monday
            currency: "USD",
        };

        rule1.handle(payment);

        expect(spyApplyRule2).toHaveBeenCalledWith(payment);

        expect(rule1.hasInterruption(payment)).toBe(false);
    });

    it("should apply only first rule for weekends", () => {
        const payment: IPayment = {
            amount: 100,
            user: "regular",
            method: "visa",
            date: new Date("2023-10-08"), // Sunday
            currency: "USD",
        };

        rule1.handle(payment);

        expect(spyApplyRule2).not.toHaveBeenCalledWith();

        expect(rule1.hasInterruption(payment)).toBe(true);
    });

});
