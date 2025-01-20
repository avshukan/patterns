import { ChatService } from "./chatService";
import { container } from "./diConfig";

import { IChatServiceToken } from "./diTokens";

import { IChatService, IMessage } from "./interfaces";

const messages: IMessage[] = [
    { message: 'Hello <3!!!', user: 1, date: new Date() },
    { message: 'How are you? :D', user: 2, date: new Date() },
    { message: 'I am fine :)', user: 1, date: new Date() },
    { message: 'I am fuck you', user: 1, date: new Date() },
    { message: 'You are bitch', user: 1, date: new Date() },
    { message: 'Haha!', user: 1, date: new Date() },
    { message: 'Haha!', user: 1, date: new Date() },
    { message: 'Haha!', user: 1, date: new Date() },
    { message: 'Haha!', user: 1, date: new Date() },
    { message: 'Haha!', user: 1, date: new Date() },
    { message: 'Haha!', user: 1, date: new Date() },
    { message: 'I am fuck you', user: 1, date: new Date() },
    { message: 'You are bitch', user: 1, date: new Date() },
    { message: 'Haha!', user: 1, date: new Date() },
    { message: 'You-re bitch', user: 1, date: new Date() },
    { message: 'You - bitch', user: 1, date: new Date() },
    { message: 'Sorry 01', user: 1, date: new Date() },
    { message: 'Sorry 02', user: 1, date: new Date() },
    { message: 'Sorry 03', user: 1, date: new Date() },
    { message: 'Sorry 04', user: 1, date: new Date() },
    { message: 'Sorry 05', user: 1, date: new Date() },
    { message: 'Sorry 06', user: 1, date: new Date() },
    { message: 'Sorry 07', user: 1, date: new Date() },
    { message: 'Sorry 08', user: 1, date: new Date() },
    { message: 'Sorry 09', user: 1, date: new Date() },
    { message: 'Sorry 10', user: 1, date: new Date() },
    { message: 'Goodbye', user: 2, date: new Date() },
];

const chat: IChatService = container.get(IChatServiceToken);

(chat as ChatService).switchOnPlugin('emojiPlugin');

(chat as ChatService).switchOnPlugin('analyticsPlugin');

(chat as ChatService).switchOnPlugin('wordCounterPlugin');

let counter = 0;

const interval = setInterval(() => {
    const message = messages[counter];

    console.log(counter, message);

    if (!message) {
        clearInterval(interval);
        return;
    }

    chat.sendMessage(message);

    counter += 1;
}, 1000);

setTimeout(() => console.log(chat.getMessages()), messages.length * 1000 + 2000);
