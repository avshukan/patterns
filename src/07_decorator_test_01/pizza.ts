import { IDish } from "./IDish";

export class Pizza implements IDish {
    public getCost(): number {
        console.log("Pizza.getCost");
        return 1;
    }
}
