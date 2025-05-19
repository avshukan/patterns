import { CreatedOrderState } from "./created-order-state";
import { OrderStatus } from "./enums";
import { ErrorCodes } from "./errorCodes";
import type { IOrder, IPayment } from "./types";

describe('CreatedOrderState', () => {
    let order: IOrder;

    let createdOrderState: CreatedOrderState;

    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => { });

    beforeEach(() => {
        order = {
            switchState: jest.fn(),
        } as unknown as IOrder;
        createdOrderState = new CreatedOrderState(order);
    });

    it('should switch to Paid state on pay', async () => {
        const payment = {} as IPayment;
        await createdOrderState.pay(payment);
        expect(order.switchState).toHaveBeenCalledWith(OrderStatus.Paid);
    });

    it('should not allow shipping', () => {
        const result = createdOrderState.ship();

        expect(result).toBe(false);

        expect(consoleLogSpy).toHaveBeenCalledWith(ErrorCodes.CREATED_CANT_SHIPPING);
    });

    it('should not allow delivery', () => {
        const result = createdOrderState.deliver();

        expect(result).toBe(false);

        expect(consoleLogSpy).toHaveBeenCalledWith(ErrorCodes.CREATED_CANT_DELIVER);
    });

    it('should switch to Cancelled state on cancel', () => {
        createdOrderState.cancel();

        expect(order.switchState).toHaveBeenCalledWith(OrderStatus.Cancelled);
    });
});
