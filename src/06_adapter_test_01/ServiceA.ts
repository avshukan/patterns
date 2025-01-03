export class ServiceA {
    public makePayment(amount: number, currency: string): string {
        return `Payment of ${amount} ${currency} processed via ServiceA`;
    }
}
