import { container } from "./diConfig";

import { IOrderServiceToken } from "./diTokens";

import { IOrder, IOrderService } from "./interfaces";

const order = container.get(IOrderServiceToken) as IOrderService;

const orderParams: IOrder = {
    id: 1,
    total: 100
};

order.placeOrder(orderParams);

const orderParams2: IOrder = {
    id: 1,
    total: 100,
    paymentService: 'mastercard'
};

order.placeOrder(orderParams2);
