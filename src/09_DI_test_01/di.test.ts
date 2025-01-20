import exp from "constants";
import { IMessage, IModerationService, IPlugin, IPluginService } from "./interfaces";
import { PluginService } from "./pluginService";
import { ChatService } from "./chatService";


describe('PluginService', () => {
    let pluginService: IPluginService;

    beforeEach(() => {
        pluginService = new PluginService();
    });

    test('should add and remove plugins correctly', () => {
        const plugin: IPlugin = {
            name: 'test',
            handleText: jest.fn().mockReturnValue('test')
        };

        pluginService.addPlugin(plugin);

        expect(pluginService.getPlugins()).toEqual([plugin]);

        pluginService.removePlugin(plugin);

        expect(pluginService.getPlugins()).toEqual([]);
    });

    test('should handle removing non-existent plugins gracefully', () => {
        const plugin: IPlugin = { name: 'nonExistent', handleText: jest.fn() };

        pluginService.removePlugin(plugin);

        expect(pluginService.getPlugins()).toHaveLength(0);
    });


    test('should apply plugins to messages', () => {
        const message: IMessage = {
            message: 'test',
            user: 1,
            date: new Date()
        };

        const plugin1: IPlugin = {
            name: 'plugin1',
            handleText: (text) => text.toUpperCase(),
        };

        jest.spyOn(plugin1, 'handleText');

        const plugin2: IPlugin = {
            name: 'plugin2',
            handleText: jest.fn().mockReturnValue('plugin1'),
        };

        pluginService.addPlugin(plugin1);

        const processedMessage1 = pluginService.applyPlugins(message);

        expect(plugin1.handleText).toHaveBeenCalled();

        expect(processedMessage1.message).toBe('TEST');

        expect(plugin2.handleText).not.toHaveBeenCalled();

        pluginService.addPlugin(plugin2);

        const processedMessage2 = pluginService.applyPlugins(message);

        expect(plugin1.handleText).toHaveBeenCalled();

        expect(plugin2.handleText).toHaveBeenCalledWith('TEST');

        expect(processedMessage2.message).toBe('plugin1');
    })
});

describe('ChatService', () => {
    let pluginService: IPluginService;

    let moderationService: IModerationService;

    let chatService: ChatService;

    beforeEach(() => {
        pluginService = new PluginService();

        moderationService = {
            moderate: jest.fn().mockImplementation((message) => message)
        };

        chatService = new ChatService(moderationService, pluginService);
    })

    test('should apply plugins to messages', () => {
        const emojiPlugin: IPlugin = {
            name: 'emoji',
            handleText: jest.fn((text) => text.replace(':)', '😀')),
        };

        const wordCounterPlugin = {
            name: 'wordCounter',
            handleText: jest.fn((text) => text),
        };

        pluginService.addPlugin(emojiPlugin);

        pluginService.addPlugin(wordCounterPlugin);

        const message: IMessage = { message: 'Hello :)', user: 1, date: new Date() };

        chatService.sendMessage(message);

        expect(emojiPlugin.handleText).toHaveBeenCalledWith('Hello :)');

        expect(wordCounterPlugin.handleText).toHaveBeenCalledWith('Hello 😀');
    })
})

