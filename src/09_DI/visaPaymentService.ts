import "reflect-metadata";

import { injectable } from "inversify";

import { IVisaPaymentService } from "./interfaces";

@injectable()
export class VisaPaymentService implements IVisaPaymentService {
    async processPayment(orderId: number, amount: number): Promise<boolean> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const success = Math.random() > 0.5;
                console.log(`Visa Payment ${success ? 'successful' : 'failed'} for order #${orderId}`);
                resolve(success);
            }, 3000 + Math.round(Math.random() * 3000));
        });
    }
}
