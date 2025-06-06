import { injectable } from "inversify";
import type { IOrder, IOrderState, IPayment } from "./types";
import { ErrorCodes } from "./errorCodes";


@injectable()
export class CancelledOrderState implements IOrderState {
    constructor(private readonly order: IOrder) { }

    async pay(payment: IPayment): Promise<boolean> {
        console.log(ErrorCodes.CANCELLED_CANT_PAY);
        return false;
    }

    ship(): boolean {
        console.log(ErrorCodes.CANCELLED_CANT_SHIPPING);
        return false;
    }

    deliver(): boolean {
        console.log(ErrorCodes.CANCELLED_CANT_DELIVER);
        return false;
    }

    cancel(): boolean {
        console.log(ErrorCodes.CANCELLED_CANT_CANCEL);
        return false;
    }
}
