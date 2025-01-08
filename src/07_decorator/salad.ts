import { IDish } from "./IDish";

export class Salad implements IDish {
    public getCost(): number {
        return 150;
    }

    public getDescription(): string {
        return "Salad";
    }
}
