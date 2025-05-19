import { container } from "./diConfig";
import { OrderFactory } from "./order-factory";
import { IPayment } from "./types";

const order = OrderFactory.create();

const payment: IPayment = {
    amount: 100,
    currency: 'USD',
};

(async () => {
    const result = await order.pay(payment);
    console.log("Payment Result:", result);
    order.ship();
    console.log("Shipping");
    order.deliver();
})();