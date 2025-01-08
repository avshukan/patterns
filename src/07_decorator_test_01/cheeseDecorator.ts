import { IDish } from "./IDish";

export function CheeseDecorator(dish: IDish) {
    let _hasCheese = false;

    return new Proxy(dish, {
        get(target, prop, receiver) {
            if (prop === 'getCheese') {
                return () => { 
                    return _hasCheese;
                };
            }

            if (prop === 'setCheese') {
                return () => { 
                    _hasCheese = !_hasCheese; 
                };
            }

            if (prop === 'getCost') {
                return () => {
                    const cheeseMode = _hasCheese ? 2 : 1;

                    const cost = target.getCost() * cheeseMode;

                    return cost;
                };
            }

            return Reflect.get(target, prop, receiver);
        }
    });
}
