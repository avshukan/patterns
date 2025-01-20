export interface IMessage {
    message: string;
    user: number;
    date: Date;
}

export interface IChatService {
    sendMessage(message: IMessage): void;

    getMessages(): IMessage[];
}

export interface IModerationServiceConfig {
    restrictedWords: string[]; // words that are not allowed
    warningInterval: number; // time in seconds between messages
    warningMessageCount: number; // number of messages allowed in the interval
    banInterval: number; // time in seconds for which a user is banned
}

export interface IModerationService {
    moderate(message: IMessage): IMessage;
}

export interface IPluginService {
    getPlugins(): IPlugin[];

    getPluginNames(): string[];

    addPlugin(plugin: IPlugin): void;

    removePlugin(pluginName: string): void;

    removePlugin(plugin: IPlugin): void;

    applyPlugins(message: IMessage): IMessage;
}

export interface IPlugin {
    name: string;

    handleText(text: string): string;
}
