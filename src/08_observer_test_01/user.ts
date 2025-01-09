import { IChatSubscriber } from "./IChatSubsriber";

import { INotifyData } from "./INotifyData";

export class User implements IChatSubscriber {
    _id: number;

    _name: string;

    constructor(private name: string) {
        this._id = Math.round(Math.random() * 1000);
        this._name = name;
    }

    getId(): number {
        return this._id;
    }

    getName(): string {
        return this._name;
    }

    update(data: INotifyData): void {
        console.log(`User ${this._name} received message ${data.id}: ${data.text}`);
    }
}
