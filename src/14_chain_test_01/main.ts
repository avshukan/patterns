import type { IPayment } from "./types";
import rulesConfigBuilder from "./rules-config/rules-config-builder";
import { rulesConfig } from "./rules-config/rules-config";


const rules = rulesConfigBuilder(rulesConfig);

const payment: IPayment = {
    amount: 100,
    user: 'premium',
    method: 'visa',
    date: new Date(),
    currency: 'USD',
};

const paymentResult = rules.handle(payment);

console.log("Payment Result:", paymentResult);
