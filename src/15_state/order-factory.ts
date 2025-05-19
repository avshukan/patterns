import type { IOrder } from "./types";
import { OrderStatus } from "./enums";
import { Order } from './order'
import { CreatedOrderState } from "./created-order-state";
import { PaidOrderState } from "./paid-order-state";
import { ShippedOrderState } from "./shipped-order-state";
import { DeliveredOrderState } from "./delivered-order-state";
import { CancelledOrderState } from "./cancelled-order-state";

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

export class OrderFactory {
    public static create(): IOrder {
        const order = new Order();

        order.bindState(OrderStatus.Created, new CreatedOrderState(order));

        order.bindState(OrderStatus.Paid, new PaidOrderState(order));

        order.bindState(OrderStatus.Shipped, new ShippedOrderState(order));

        order.bindState(OrderStatus.Delivered, new DeliveredOrderState(order));

        order.bindState(OrderStatus.Cancelled, new CancelledOrderState(order));

        order.switchState(OrderStatus.Created);

        return order;
    }
}
