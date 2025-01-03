export class ServiceB {
    public processPayment(details: { price: number; currencyCode: string; userId: string }): { status: string; transactionId: string } {
        return {
            status: "success",
            transactionId: `txn_${Math.random().toString(36).substring(2, 15)}`
        };
    }
}
