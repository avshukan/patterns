import { OrderStatus } from "./enums";


export interface IPayment {
    currency: string;
    amount: number;
}

export interface IOrderState {
    pay(payment: IPayment): Promise<boolean>;
    ship(): boolean;
    deliver(): boolean;
    cancel(): boolean;
}

export interface IOrder {
    getState(): IOrderState | null;
    setState(state: IOrderState): void;
    switchState(stateName: OrderStatus): boolean;

    pay(payment: IPayment): Promise<boolean>;
    ship(): boolean;
    deliver(): boolean;
    cancel(): boolean;
}
