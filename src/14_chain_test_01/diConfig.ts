import "reflect-metadata";
import { Container } from "inversify";
import type { IPaymentRule } from "./types";
import {
    DateTypeRule,
    MethodTypeRule,
    Usd1kSpecialTypeRule,
    UserTypeRule
} from "./rules";
import {
    DateTypeRuleToken,
    MethodTypeRuleToken,
    Usd1kSpecialTypeRuleToken,
    UserTypeRuleToken,
} from "./diTokens";


export const container = new Container();

container.bind<IPaymentRule>(DateTypeRuleToken).to(DateTypeRule);

container.bind<IPaymentRule>(MethodTypeRuleToken).to(MethodTypeRule);

container.bind<IPaymentRule>(Usd1kSpecialTypeRuleToken).to(Usd1kSpecialTypeRule);

container.bind<IPaymentRule>(UserTypeRuleToken).to(UserTypeRule);