import { INotifyData } from "./INotifyData";

export interface IChatSubscriber {
    getId(): number;

    update(data: INotifyData): void;
}
