import { IDish } from "./IDish";

export function SauceDecorator(dish: IDish) {
    let _hasSauce = false;

    return new Proxy(dish, {
        get(target, prop, receiver) {
            if (prop === 'getSauce') {
                return () => {
                    return _hasSauce;
                };
            }

            if (prop === 'setSauce') {
                return () => {
                    _hasSauce = !_hasSauce;
                };
            }

            if (prop === 'getCost') {
                return () => {
                    const SauceMode = _hasSauce ? 1 : 0;

                    const cost = target.getCost() + SauceMode;

                    return cost;
                };
            }

            return Reflect.get(target, prop, receiver);
        }
    });
}
