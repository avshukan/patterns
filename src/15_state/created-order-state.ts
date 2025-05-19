import { injectable } from "inversify";
import type { IOrder, IOrderState, IPayment } from "./types";
import { ErrorCodes } from "./errorCodes";
import { OrderStatus } from "./enums";


@injectable()
export class CreatedOrderState implements IOrderState {
    constructor(private readonly order: IOrder) { }

    async pay(payment: IPayment): Promise<boolean> {
        this.order.switchState(OrderStatus.Paid);
        return true;
    }

    ship(): boolean {
        console.log(ErrorCodes.CREATED_CANT_SHIPPING);
        return false;
    }

    deliver(): boolean {
        console.log(ErrorCodes.CREATED_CANT_DELIVER);
        return false;
    }

    cancel(): boolean {
        this.order.switchState(OrderStatus.Cancelled);
        return true;
    }
}
