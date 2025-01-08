import { IDish } from "./IDish";

export abstract class DishDecorator implements IDish {
    constructor(dish: IDish) { }

    public abstract getCost(): number;

    public abstract getDescription(): string;
}
