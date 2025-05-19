import type { IOrder, IPayment } from "./types";
import { OrderStatus } from "./enums";
import { ErrorCodes } from "./errorCodes";
import { ShippedOrderState } from "./shipped-order-state";


describe('ShippedOrderState', () => {
    let shippedOrderState: ShippedOrderState;
    let order: IOrder;

    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => { });

    beforeEach(() => {
        order = {
            switchState: jest.fn(),
        } as unknown as IOrder;
        shippedOrderState = new ShippedOrderState(order);
    });

    it('should not allow payment', async () => {
        const result = await shippedOrderState.pay({} as IPayment);
        expect(result).toBe(false);
        expect(consoleLogSpy).toHaveBeenCalledWith(ErrorCodes.SHIPPED_CANT_PAY);
    });

    it('should not allow shipping', () => {
        const result = shippedOrderState.ship();
        expect(result).toBe(false);
        expect(consoleLogSpy).toHaveBeenCalledWith(ErrorCodes.SHIPPED_CANT_SHIPPING);
    });

    it('should allow delivery', () => {
        const result = shippedOrderState.deliver();
        expect(result).toBe(true);
        expect(order.switchState).toHaveBeenCalledWith(OrderStatus.Delivered);
    });

    it('should allow cancellation', () => {
        const result = shippedOrderState.cancel();
        expect(result).toBe(true);
        expect(order.switchState).toHaveBeenCalledWith(OrderStatus.Cancelled);
    });
});
