import "reflect-metadata";

import { injectable } from "inversify";

import {
    IMessage,
    IPlugin,
    IPluginService
} from "./interfaces";

@injectable()
export class PluginService implements IPluginService {
    private _plugins: IPlugin[] = [];

    getPlugins(): IPlugin[] {
        return this._plugins;
    }

    getPluginNames(): string[] {
        return this._plugins.map((plugin) => plugin.name);
    }

    addPlugin(plugin: IPlugin): void {
        this._plugins.push(plugin);
    }

    removePlugin(pluginName: string): void;
    removePlugin(plugin: IPlugin): void;
    removePlugin(data: string | IPlugin): void {
        if (typeof data === 'string') {
            this._plugins = this._plugins.filter((p) => p.name !== data);
            return;
        } else if ((data as IPlugin).name !== undefined) {
            this._plugins = this._plugins.filter((p) => p.name !== data.name);
            return;
        }
    }

    applyPlugins(message: IMessage): IMessage {
        console.log('Applying plugins to message:', message);

        let resultMessage = message.message;

        for (const plugin of this._plugins) {
            resultMessage = plugin.handleText(resultMessage);
        }

        return { ...message, message: resultMessage };
    }
}
