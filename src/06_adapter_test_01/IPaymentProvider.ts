import { IPaymentResult } from "./IPaymentResult";

export interface IPaymentProvider {
    pay(amount: number, currency: string): IPaymentResult;
}
