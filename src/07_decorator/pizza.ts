import { IDish } from "./IDish";

export class Pizza implements IDish {
    public getCost(): number {
        console.log("Pizza.getCost");
        return 300;
    }

    public getDescription(): string {
        console.log("Pizza.getDescription");
        return "Pizza";
    }
}
