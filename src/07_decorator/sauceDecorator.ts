import { DishDecorator } from "./dishDecorator";

import { IDish } from "./IDish";

/**
 * Decorator for adding sauce functionality to a dish.
 * 
 * adds methods:
 * - `switchSauce(state?: boolean): void` — Switch the sauce state.
 * - `isSauceEnabled(): boolean` — Get the current sauce state.
 */
export class SauceDecorator extends DishDecorator {
    private _hasSauce: boolean = false;

    constructor(private readonly dish: IDish) {
        super(dish);
        Object.assign(this, dish); // Передаем методы
    }

    public getCost(): number {
        const additionalCost = this._hasSauce ? 20 : 0;
        return this.dish.getCost() + additionalCost;
    }

    public getDescription(): string {
        const additionalDescription = this._hasSauce ? " with sauce" : "";
        return `${this.dish.getDescription()}${additionalDescription}`;
    }

    public switchSauce(state?: boolean): void {
        this._hasSauce = state ?? !this._hasSauce;
    }

    public isSauceEnabled(): boolean {
        return this._hasSauce;
    }
}
