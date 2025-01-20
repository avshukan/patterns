import "reflect-metadata";

import { injectable, inject } from "inversify";

import {
    IModerationServiceToken,
    IPluginServiceToken,
} from "./diTokens";

import {
    IChatService,
    IMessage,
    IModerationService,
    IPlugin,
    IPluginService
} from "./interfaces";

import { EmojiPlugin } from "./emojiPlugin";

import { WordCounterPlugin } from "./wordCounterPlugin";

import { AnalyticsPlugin } from "./analyticsPlugin";

@injectable()
export class ChatService implements IChatService {
    private readonly _messages: IMessage[] = [];

    constructor(
        @inject(IModerationServiceToken) private readonly _moderationService: IModerationService,
        @inject(IPluginServiceToken) private readonly _pluginService: IPluginService,
    ) { }

    public sendMessage(message: IMessage): void {
        try {
            const moderatedMessage = this._moderationService.moderate(message);

            console.log('before plugins:', moderatedMessage);

            const pluggedMessage = this._pluginService.applyPlugins(moderatedMessage);

            console.log('after plugins:', pluggedMessage);

            this._messages.push(pluggedMessage);
        } catch (error) {
            console.error((error as Error).message);
        }
    }

    public getMessages(): IMessage[] {
        return this._messages;
    }

    private createPlugin(name: string): IPlugin | null {
        switch (name) {
            case 'emoji':
                return new EmojiPlugin();
            case 'wordCounter':
                return new WordCounterPlugin();
            case 'analytics':
                return new AnalyticsPlugin();
            default:
                return null;
        }
    }

    public switchOnPlugin(name: string): void {
        const pluginNames = this._pluginService.getPluginNames();

        if (pluginNames.includes(name)) {
            return;
        }

        const plugin: IPlugin | null = this.createPlugin(name);

        if (!plugin) {
            return;
        }

        this._pluginService.addPlugin(plugin);
    }

    public swithchOffPlugin(name: string): void {
        if (!this._pluginService.getPluginNames().includes(name)) {
            return;
        }

        this._pluginService.removePlugin(name);
    }
}
