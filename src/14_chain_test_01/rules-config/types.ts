import type { IPaymentRule } from "../types";

export type RuleBindingType = {
    token: Symbol,
    rule: new (...args: any[]) => IPaymentRule,
};

export type RulesTokensType = {
    [key: string]: RuleBindingType,
};
