import { IChatSubscriber } from "./IChatSubsriber";

import { IMessageData } from "./IMessageData";

import { INotifyData } from "./INotifyData";

export interface IChatChannel {
    getName(): string;

    postMessage(data: IMessageData): boolean;

    subscribe(observer: IChatSubscriber): boolean;

    unsubscribe(observer: IChatSubscriber): boolean;

    notifySubscribers(data: INotifyData): boolean;
}
