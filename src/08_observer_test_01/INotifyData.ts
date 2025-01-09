import { IMessageData } from "./IMessageData";

export interface INotifyData extends IMessageData {
    readonly id: number;
    readonly date: Date;
    readonly channelName: string;
}
