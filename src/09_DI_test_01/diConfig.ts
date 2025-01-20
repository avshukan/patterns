import "reflect-metadata";

import { Container } from "inversify";

import { ModerationService } from "./moderationService";

import { ChatService } from "./chatService";

import { IChatService, IModerationService, IModerationServiceConfig, IPluginService } from "./interfaces";

import { IChatServiceToken, IModerationServiceToken, IPluginServiceToken } from "./diTokens";

import { PluginService } from "./pluginService";

const moderationServiceConfig: IModerationServiceConfig = {
    restrictedWords: ['fuck', 'bitch', 'suck'],
    warningInterval: 5,
    warningMessageCount: 3,
    banInterval: 10,
};

export const container = new Container();

container.bind<IChatService>(IChatServiceToken).to(ChatService);

container.bind<IModerationService>(IModerationServiceToken).toDynamicValue(() => new ModerationService(moderationServiceConfig));

container.bind<IPluginService>(IPluginServiceToken).to(PluginService);
