/* This file is configuration-only, no logic to test */

import type { RulesTokensType } from "./types";
import {
    DateTypeRuleToken,
    MethodTypeRuleToken,
    UserTypeRuleToken,
} from "../diTokens";
import {
    DateTypeRule,
    MethodTypeRule,
    UserTypeRule,
} from "../rules/";


export const rulesTokens: RulesTokensType = {
    DateTypeRule: {
        token: DateTypeRuleToken,
        rule: DateTypeRule
    },
    MethodTypeRule: {
        token: MethodTypeRuleToken,
        rule: MethodTypeRule
    },
    UserTypeRule: {
        token: UserTypeRuleToken,
        rule: UserTypeRule
    }
};
