import { DishDecorator } from "./dishDecorator";

import { IDish } from "./IDish";

type CheeseAmount = "none" | "extra" | "double";

/**
 * Decorator for adding discount functionality to a dish.
 *
 * Adds methods:
 * - `switchCheese(amount: CheeseAmount): void` — Switch the amount of cheese.
 * - `getCheeseAmount(): CheeseAmount` — Get the current amount of cheese.
 */
export class ExtraCheeseDecorator extends DishDecorator {
    private _cheeseAmount: CheeseAmount = "none";

    constructor(private readonly dish: IDish) {
        super(dish);
        Object.assign(this, dish); // Передаем методы
    }

    public getCost(): number {
        const additionalCost =
            this._cheeseAmount === "extra" ? 50 : this._cheeseAmount === "double" ? 80 : 0;
        return this.dish.getCost() + additionalCost;
    }

    public getDescription(): string {
        const additionalDescription =
            this._cheeseAmount === "extra" ? " with extra cheese" : this._cheeseAmount === "double" ? " with double cheese" : "";
        return `${this.dish.getDescription()}${additionalDescription}`;
    }

    public switchCheese(amount: CheeseAmount): void {
        if (!["none", "extra", "double"].includes(amount)) {
            throw new Error(`Invalid cheese amount: ${amount}`);
        }
        this._cheeseAmount = amount;
    }

    public getCheeseAmount(): CheeseAmount {
        return this._cheeseAmount;
    }
}
