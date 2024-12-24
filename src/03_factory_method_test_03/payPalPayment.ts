import { Payment } from "./payment";

export class PayPalPayment implements Payment {
    pay(amount: number): void {
        console.log(`Paid $${amount} using PayPal`);
    }
}
