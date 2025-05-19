import { injectable } from "inversify";
import { IOrder, IOrderState, IPayment } from "./types";
import { OrderStatus } from "./enums";

/*
Заказ может находиться в следующих состояниях:
Created
Paid
Shipped
Delivered
Cancelled

Каждое состояние должно определять, какие действия разрешены. Например:
Только заказ в состоянии Created можно оплатить.
Только оплаченный заказ можно отправить.
Доставленный или отменённый заказ нельзя изменить.
*/

@injectable()
export class Order implements IOrder {
    private state: IOrderState | null = null;
    private states = new Map<OrderStatus, IOrderState>();

    bindState(status: OrderStatus, state: IOrderState): void {
        this.states.set(status, state);

        this.state = state;
      }

    public getState(): IOrderState | null {
        return this.state;
    }

    public setState(state: IOrderState): void {
        this.state = state;
    }

    switchState(status: OrderStatus): boolean {
        const state = this.states.get(status);
        if (!state) return false;
        this.state = state;
        return true;
    }

    async pay(payment: IPayment): Promise<boolean> {
        return this.state!.pay(payment);
    }

    ship(): boolean {
        return this.state!.ship();
    }

    deliver(): boolean {
        return this.state!.deliver();
    }

    cancel(): boolean {
        return this.state!.cancel();
    }
}
