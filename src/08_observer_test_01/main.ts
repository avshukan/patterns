import { User } from "./user";

import { ChatChannel } from "./ChatChannel";
import { serialize } from "v8";

const channelAuto = new ChatChannel('Auto');

const channelBBQ = new ChatChannel('BBQ');

const channelCooking = new ChatChannel('Cooking');

const Alice = new User('Alice');

const Bob = new User('Bob');

const Carol = new User('Carol');

const actions = [
    () => channelAuto.subscribe(Alice),
    () => channelAuto.subscribe(Bob),
    () => channelBBQ.subscribe(Alice),
    () => channelBBQ.subscribe(Bob),
    () => channelCooking.subscribe(Carol),
    () => channelAuto.postMessage({ text: 'Hello Auto!', userId: Alice.getId() }),
    () => channelBBQ.postMessage({ text: 'Hello BBQ!', userId: Bob.getId() }),
    () => channelCooking.postMessage({ text: 'Hello Cooking!', userId: Carol.getId() }),
    () => channelAuto.unsubscribe(Alice),
    () => channelAuto.postMessage({ text: 'Hello Auto from Bob!', userId: Carol.getId() }),
    () => channelAuto.unsubscribe(Bob),
    () => channelAuto.postMessage({ text: 'Last message from Carol!', userId: Carol.getId() }),
];

const timeout = 1000;

let counter = 0;

const interval = setInterval(() => {
    console.log('='.repeat(40));
    const action = actions.shift();
    console.log('Counter:', counter += 1, 'actions left:', actions.length);

    if (action) {
        action();
    } else {
        clearInterval(interval);
    }
}, timeout);