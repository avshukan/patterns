import { ServiceA } from "./ServiceA";

import { ServiceAAdapter } from "./ServiceAAdapter";

import { ServiceB } from "./ServiceB";

import { ServiceBAdapter } from "./ServiceBAdapter";

import { ServiceC } from "./ServiceC";

import { ServiceCAdapter } from "./ServiceCAdapter";

const providers = [
    { name: "ServiceA", provider: new ServiceAAdapter(new ServiceA()) },
    { name: "ServiceB", provider: new ServiceBAdapter(new ServiceB()) },
    { name: "ServiceC", provider: new ServiceCAdapter(new ServiceC()) },
];

providers.forEach(({ name, provider }, index) => {
    const result = provider.pay(100 * index + 10, "USD");
    console.log(`[${name}]`, result);
});
