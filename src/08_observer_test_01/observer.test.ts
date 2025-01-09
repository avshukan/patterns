import { ChatChannel } from "./ChatChannel";

import { IChatSubscriber } from "./IChatSubsriber";

import { IMessageData } from "./IMessageData";

describe('channels', () => {
    test('subscribe and unsubscribe', () => {
        const channel = new ChatChannel('Auto');

        const user: IChatSubscriber = {
            getId: jest.fn().mockReturnValue(2),
            update: jest.fn(),
        };

        expect(channel.subscribe(user)).toBe(true);

        expect(channel.subscribe(user)).toBe(false);

        expect(channel.unsubscribe(user)).toBe(true);

        expect(channel.unsubscribe(user)).toBe(false);
    });


    test('send and receive', () => {
        const channel = new ChatChannel('Auto');

        const author: IChatSubscriber = {
            getId: jest.fn().mockReturnValue(1),
            update: jest.fn(),
        };

        const user: IChatSubscriber = {
            getId: jest.fn().mockReturnValue(2),
            update: jest.fn(),
        };

        channel.subscribe(author);

        channel.subscribe(user);

        const message: IMessageData = { text: 'Hello Auto!', userId: author.getId() };

        channel.postMessage(message);

        expect(author.update).not.toHaveBeenCalled();

        expect(user.update).toHaveBeenCalled();
    });

    test('User receives notifications only from subscribed channels', () => {
        const channel1 = new ChatChannel('Auto');
        const channel2 = new ChatChannel('BBQ');

        const user: IChatSubscriber = {
            getId: jest.fn().mockReturnValue(2),
            update: jest.fn(),
        };

        channel1.subscribe(user);
        channel2.subscribe(user);

        const message1: IMessageData = { text: 'Hello Auto!', userId: 1 };
        const message2: IMessageData = { text: 'Hello BBQ!', userId: 1 };

        channel1.postMessage(message1);
        channel2.postMessage(message2);

        expect(user.update).toHaveBeenCalledTimes(2);
    });

    test('Unsubscribed user does not receive notifications', () => {
        const channel = new ChatChannel('Auto');

        const user: IChatSubscriber = {
            getId: jest.fn().mockReturnValue(2),
            update: jest.fn(),
        };

        channel.subscribe(user);
        channel.unsubscribe(user);

        const message: IMessageData = { text: 'Hello Auto!', userId: 1 };

        channel.postMessage(message);

        expect(user.update).not.toHaveBeenCalled();
    });

});
