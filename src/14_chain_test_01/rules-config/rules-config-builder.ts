import type { IPaymentRule } from "../types";
import rulesComposer from "./rules-composer";
import rulesMapper from "./rules-mapper";


const rulesConfigBuilder = (rules: string[]): IPaymentRule => {
    const paymentRules = rulesMapper(rules);

    const chain = rulesComposer(paymentRules);

    return chain;
}

export default rulesConfigBuilder;
