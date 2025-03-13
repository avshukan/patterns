import { ICreditCard, IPaymentService } from "./types";

export class PaymentService implements IPaymentService {
    constructor(private paymentAccount: string) { }

    public pay(sender: ICreditCard, reciever: string, amount: number): Promise<boolean> {
        const resolveTimeout = 1000;

        const rejectTimeout = Math.floor(Math.random() * 1000) + 500;

        const successPromise = new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, resolveTimeout);
        });

        const failPromise = new Promise((resolve) => {
            setTimeout(() => {
                resolve(false);
            }, rejectTimeout);
        });

        return Promise.race([successPromise, failPromise])
            .then((result) => {
                if (result) {
                    console.log(`Payment $${amount} from ${sender.name} to ${reciever} is successful`);
                } else {
                    console.log(`Payment $${amount} from ${sender.name} to ${reciever} has failed`);
                }
                return result as boolean;
            })
            .catch(() => {
                console.log(`Payment $${amount} from ${sender.name} to ${reciever} has failed`);
                return false;
            });
    }
}