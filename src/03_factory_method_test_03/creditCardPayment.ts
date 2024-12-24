import { Payment } from "./payment";

export class CreditCardPayment implements Payment {
    pay(amount: number): void {
        console.log(`Paid $${amount} using credit card`);
    }
}
