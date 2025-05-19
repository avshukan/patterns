import { injectable } from "inversify";
import type { IOrder, IOrderState, IPayment } from "./types";
import { OrderStatus } from "./enums";
import { ErrorCodes } from "./errorCodes";


@injectable()
export class PaidOrderState implements IOrderState {
    constructor(private readonly order: IOrder) { }

    async pay(payment: IPayment): Promise<boolean> {
        console.log(ErrorCodes.PAYD_CANT_PAY);
        return false;
    }

    ship(): boolean {
        this.order.switchState(OrderStatus.Shipped);
        return true;
    }

    deliver(): boolean {
        console.log(ErrorCodes.PAYD_CANT_DELIVER);
        return false;
    }

    cancel(): boolean {
        this.order.switchState(OrderStatus.Cancelled);
        return true;
    }
}
