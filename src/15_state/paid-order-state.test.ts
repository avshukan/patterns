import type { IOrder, IPayment } from "./types";
import { OrderStatus } from "./enums";
import { PaidOrderState } from "./paid-order-state";


describe('PaidOrderState', () => {
    let paidOrderState: PaidOrderState;
    let order: IOrder;

    beforeEach(() => {
        order = {
            getState: jest.fn(),
            bindState: jest.fn(),
            switchState: jest.fn(),
        } as unknown as IOrder;

        paidOrderState = new PaidOrderState(order);
    });

    it('should not allow payment', async () => {
        const result = await paidOrderState.pay({} as IPayment);
        expect(result).toBe(false);
    });

    it('should allow shipping', () => {
        const result = paidOrderState.ship();
        expect(result).toBe(true);
        expect(order.switchState).toHaveBeenCalledWith(OrderStatus.Shipped);
    });

    it('should not allow delivery', () => {
        const result = paidOrderState.deliver();
        expect(result).toBe(false);
    });

    it('should allow cancellation', () => {
        const result = paidOrderState.cancel();
        expect(result).toBe(true);
        expect(order.switchState).toHaveBeenCalledWith(OrderStatus.Cancelled);
    });
});

