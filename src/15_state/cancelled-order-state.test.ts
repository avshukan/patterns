import type { IOrder, IPayment } from "./types";
import { CancelledOrderState } from "./cancelled-order-state";

describe('CancelledOrderState', () => {
    let cancelledOrderState: CancelledOrderState;
    let order: IOrder;

    beforeEach(() => {
        order = {
            getState: jest.fn(),
            bindState: jest.fn(),
            switchState: jest.fn(),
        } as unknown as IOrder;

        cancelledOrderState = new CancelledOrderState(order);
    });

    it('should not allow payment', async () => {
        const result = await cancelledOrderState.pay({} as IPayment);
        expect(result).toBe(false);
    });

    it('should not allow shipping', () => {
        const result = cancelledOrderState.ship();
        expect(result).toBe(false);
    });

    it('should not allow delivery', () => {
        const result = cancelledOrderState.deliver();
        expect(result).toBe(false);
    });

    it('should not allow cancellation', () => {
        const result = cancelledOrderState.cancel();
        expect(result).toBe(false);
    });
});
