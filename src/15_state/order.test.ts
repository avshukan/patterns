import { OrderStatus } from "./enums";
import { Order } from "./order";
import type { IOrderState } from "./types";


describe('Order', () => {
    let order: Order;
    let mockState: IOrderState;

    beforeEach(() => {
        order = new Order();
        mockState = {
            pay: jest.fn(),
            ship: jest.fn(),
            deliver: jest.fn(),
            cancel: jest.fn(),
        } as unknown as IOrderState;
    });

    it('should switch to the correct state', () => {
        order.bindState(OrderStatus.Created, mockState);

        order.switchState(OrderStatus.Created);

        expect(order.getState()).toBe(mockState);
    });

    it('should return null if state is not bound', () => {
        expect(order.getState()).toBeNull();
    });

    it('should bind state correctly', () => {
        order.bindState(OrderStatus.Created, mockState);

        expect(order.getState()).toBe(mockState);
    });

    it('should set the state correctly', () => {
        order.setState(mockState);

        expect(order.getState()).toBe(mockState);
    });

    it('should use state.pay() method', async () => {
        order.bindState(OrderStatus.Created, mockState);
        const payment = {} as any;

        await order.pay(payment);

        expect(mockState.pay).toHaveBeenCalledWith(payment);
    });

    it('should use state.ship() method', () => {
        order.bindState(OrderStatus.Shipped, mockState);

        order.ship();

        expect(mockState.ship).toHaveBeenCalled();
    });

    it('should use state.deliver() method', () => {
        order.bindState(OrderStatus.Delivered, mockState);

        order.deliver();

        expect(mockState.deliver).toHaveBeenCalled();
    });

    it('should use state.cancel() method', () => {
        order.bindState(OrderStatus.Cancelled, mockState);

        order.cancel();

        expect(mockState.cancel).toHaveBeenCalled();
    });

    it('should return false if state is not found', () => {
        const result = order.switchState(OrderStatus.Paid);

        expect(result).toBe(false);
    });
});
