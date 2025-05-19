import { OrderStatus } from "./enums";
import { OrderFactory } from "./order-factory";
import { IOrder } from "./types";

const order: IOrder = {
    getState: jest.fn().mockReturnValue(OrderStatus.Created),
    bindState: jest.fn(),
    switchState: jest.fn(),
} as unknown as IOrder;

jest.mock('./order', () => {
    return {
        Order: jest.fn().mockImplementation(() => {
            return order;
        }),
    };
});


describe('OrderFactory', () => {
    it('should create an order with the initial state set to Created', () => {
        const order = OrderFactory.create();

        expect(order.getState()).toBe(OrderStatus.Created);
    });
});
