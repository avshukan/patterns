import { IPlugin } from "./interfaces";

export class AnalyticsPlugin implements IPlugin {
    readonly name = 'analyticsPlugin';

    private _stat: Record<string, number> = {};

    handleText(text: string): string {
        const messages = this._stat.messages || 0;

        this._stat.messages = messages + 1;

        this._stat.length = (this._stat.length || 0) + text.length;

        return text;
    }

    public getStat(): string {
        const messages = this._stat.messages || 0;

        if (messages === 0) {
            return 'No messages';
        }

        const length = this._stat.length || 0;

        const average = length / messages;

        const stat = `Messages: ${messages}, Average length: ${average}`;

        return stat;
    }
}