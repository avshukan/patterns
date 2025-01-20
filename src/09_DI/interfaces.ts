export interface IMasterCardPaymentService {
    pay(transactionId: number, amount: number, date: string, message?: string): Promise<{
        success: boolean;
        datePayment: string;
        message?: string;
    }>;
}

export interface IVisaPaymentService {
    processPayment(orderId: number, amount: number): Promise<boolean>;
}

export type PaymentServiceType = 'visa' | 'mastercard';

export interface IPaymentRequest {
    orderId: number;
    amount: number;
    paymentService?: PaymentServiceType;
}

export interface IPaymentService {
    processPayment(request: IPaymentRequest): Promise<boolean>;
}

export interface INotificationService {
    sendNotification(orderId: number): void;
}

export interface IOrder {
    id: number;
    total: number;
    paymentService?: PaymentServiceType;
}

export interface IOrderService {
    placeOrder(order: IOrder): Promise<void>;
}
