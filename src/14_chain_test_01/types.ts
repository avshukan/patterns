export type UserType = 'regular' | 'premium';

export type MethodType = 'visa' | 'mastercard' | 'paypal';

export interface IPayment {
    amount: number;
    user: UserType;
    method: MethodType;
    date: Date;
    currency: string;
}

export interface IPaymentResult {
    originalAmount: number;
    feeAmount: number;
    totalAmount: number;
}

export interface IPaymentContext {
    payment: IPayment;
    feeAmount: number;
    appliedRules: string[];
    interruptedBy?: string;
    metadata?: {
        [key: string]: unknown;
    };
}

export interface IPaymentRule {
    getNext(): IPaymentRule | null;
    setNext(nextRule: IPaymentRule): void;
    handle(payment: IPayment): IPaymentResult;
    shouldApply(payment: IPayment): boolean;
}

export interface IUser {
    username: string;
    email: string;
    password: string;
}


export interface IUserRepository {
    getUser(username: string): Promise<IUser | null>;
    addUser(user: IUser): Promise<void>;
    deleteUser(username: string): Promise<void>;
}
