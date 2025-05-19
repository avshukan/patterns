import { DeliveredOrderState } from "./delivered-order-state";
import type { IOrder, IPayment } from "./types";

describe('DeliveredOrderState', () => {
    let deliveredOrderState: DeliveredOrderState;
    let order: IOrder;

    beforeEach(() => {
        order = {
            getState: jest.fn(),
            bindState: jest.fn(),
            switchState: jest.fn(),
        } as unknown as IOrder;

        deliveredOrderState = new DeliveredOrderState(order);
    });

    it('should not allow payment', async () => {
        const result = await deliveredOrderState.pay({} as IPayment);
        expect(result).toBe(false);
    });

    it('should not allow shipping', () => {
        const result = deliveredOrderState.ship();
        expect(result).toBe(false);
    });

    it('should not allow delivery', () => {
        const result = deliveredOrderState.deliver();
        expect(result).toBe(false);
    });

    it('should not allow cancellation', () => {
        const result = deliveredOrderState.cancel();
        expect(result).toBe(false);
    });
});
