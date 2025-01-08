import { IDish } from "./IDish";

export abstract class DishDecorator implements IDish {
    constructor(dish: IDish) {
        console.log('DishDecorator constructor', Object.entries(this));
     }

    public abstract getCost(): number;
}
