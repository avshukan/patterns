import { IChatSubscriber } from "./IChatSubsriber";

import { IMessageData } from "./IMessageData";

import { IChatChannel } from "./IChatChannel";

import { INotifyData } from "./INotifyData";

export class ChatChannel implements IChatChannel {
    private _subscribers: Map<number, IChatSubscriber> = new Map();

    private _messages: IMessageData[] = [];

    constructor(private readonly name: string) { }

    getName(): string {
        return this.name;
    }

    getData(): IMessageData[] {
        return this._messages;
    }

    postMessage(data: IMessageData): boolean {
        const id: number = Math.round(Math.random() * 10000);

        const date: Date = new Date();

        const message: IMessageData = {
            ...data,
            id,
            date,
        }

        this._messages.push(message);

        const notify: INotifyData = {
            ...message,
            id,
            date,
            channelName: this.getName(),
        }

        return this.notifySubscribers(notify);
    }

    subscribe(subscriber: IChatSubscriber): boolean {
        if (this._subscribers.has(subscriber.getId())) {
            console.warn(`Subscriber ${subscriber.getId()} is already registered to channel ${this.getName()}`);
            return false;
        }

        this._subscribers.set(subscriber.getId(), subscriber);

        return true;
    }

    unsubscribe(subscriber: IChatSubscriber): boolean {
        return this._subscribers.delete(subscriber.getId());
    }

    notifySubscribers(notification: INotifyData): boolean {
        for (const [id, subscriber] of this._subscribers) {
            if (notification.userId === id) {
                continue;
            }

            try {
                subscriber.update(notification);
            } catch (error) {
                console.error(error);
                return false;
            }
        }
        return true;
    }

}