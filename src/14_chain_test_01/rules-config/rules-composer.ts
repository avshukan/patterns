import type { IPaymentRule } from "../types";


const rulesComposer = (rules: IPaymentRule[]): IPaymentRule => {
    if (rules.length === 0) {
        throw new Error("No rules provided");
    }

    const [firstRule, ...restRules] = rules;

    const result = restRules.reduce((chain, rule) => {
        chain.setNext(rule);

        return chain;
    }, firstRule);

    return result;
}

export default rulesComposer;
