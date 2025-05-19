import { injectable } from "inversify";
import type { IOrder, IOrderState, IPayment } from "./types";
import { ErrorCodes } from "./errorCodes";
import { OrderStatus } from "./enums";


@injectable()
export class ShippedOrderState implements IOrderState {
    constructor(private readonly order: IOrder) { }

    async pay(payment: IPayment): Promise<boolean> {
        console.log(ErrorCodes.SHIPPED_CANT_PAY);
        return false;
    }

    ship(): boolean {
        console.log(ErrorCodes.SHIPPED_CANT_SHIPPING);
        return false;
    }

    deliver(): boolean {
        this.order.switchState(OrderStatus.Delivered);
        return true;
    }

    cancel(): boolean {
        this.order.switchState(OrderStatus.Cancelled);
        return true;
    }
}
