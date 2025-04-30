import type { IPaymentRule } from "../types";
import { rulesTokens } from "./rules-tokens";


export const rulesMapper = (rules: string[]): IPaymentRule[] => {
    if (rules.length === 0) {
        return [];
    }

    const paymentRules: IPaymentRule[] = rules.map((rule) => {
        const settings = rulesTokens[rule as keyof typeof rulesTokens];

        if (!settings) {
            throw new Error(`Rule ${rule} not found`);
        }

        const paymentRule = new settings.rule();

        if (!paymentRule) {
            throw new Error(`Rule ${rule} not found in container`);
        }

        return paymentRule;
    });

    return paymentRules;
};

export default rulesMapper;
