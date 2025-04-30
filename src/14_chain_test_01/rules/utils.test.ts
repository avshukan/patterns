import { isWeekend } from "./utils";


describe("utils", () => {
    describe("isWeekend", () => {
        it("should return true for Saturday", () => {
            const date = new Date("2023-10-07"); // Saturday

            expect(isWeekend(date)).toBe(true);
        });

        it("should return true for Sunday", () => {
            const date = new Date("2023-10-08"); // Sunday

            expect(isWeekend(date)).toBe(true);
        });

        it("should return false for Monday", () => {
            const date = new Date("2023-10-09"); // Monday

            expect(isWeekend(date)).toBe(false);
        });
    });
});
