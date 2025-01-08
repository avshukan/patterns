import { DishDecorator } from "./dishDecorator";

import { IDish } from "./IDish";

/**
 * Decorator for adding fancy serving functionality to a dish.
 */
export class FancyServingDecorator extends DishDecorator {
    constructor(private readonly dish: IDish) {
        super(dish);

        // Сохраняем существующие методы
        Object.assign(this, dish);

        console.log('FancyServingDecorator.constructor -> dish', dish);
    }

    public getCost(): number {
        console.log("FancyServingDecorator.getCost");

        const originalCost = this.dish.getCost();
        console.log("FancyServingDecorator.getCost -> originalCost", originalCost);

        const additionalCost = 100;
        console.log("FancyServingDecorator.getCost -> additionalCost", additionalCost);

        const totalCost = originalCost + additionalCost;
        console.log("FancyServingDecorator.getCost -> totalCost", totalCost);

        return totalCost;
    }

    public getDescription(): string {
        const originalDescription = this.dish.getDescription();

        const additionalDescription = " with fancy serving";

        const fullDescription = `${originalDescription}${additionalDescription}`;

        return fullDescription;
    }
}
