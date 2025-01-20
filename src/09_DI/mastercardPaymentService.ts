import "reflect-metadata";

import { injectable } from "inversify";

import { IMasterCardPaymentService } from "./interfaces";

@injectable()
export class MastercardPaymentService implements IMasterCardPaymentService {
    async pay(transactionId: number, amount: number, date: string, message?: string): Promise<{
        success: boolean;
        datePayment: string;
        message?: string;
    }> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const success = amount < 100 ? false : Math.random() > 0.5;
                const datePayment = date ?? new Date().toISOString();
                const messageText = success
                    ? `Mastercard Payment successful for ${transactionId}`
                    : `Mastercard Payment failed for ${transactionId}`;
                console.log(messageText);
                const result = {
                    success,
                    datePayment,
                    message: messageText
                };
                resolve(result);
            }, 3000 + Math.round(Math.random() * 3000));
        });
    }
}
