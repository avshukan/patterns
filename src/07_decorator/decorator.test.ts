import { ExtraCheeseDecorator } from "./extraCheeseDecorator";

import { FancyServingDecorator } from "./fancyServingDecorator";
import { EnhancedDish } from "./IDish";

import { Pizza } from "./pizza";

import { Salad } from "./salad";

import { SauceDecorator } from "./sauceDecorator";

// describe("Extra functions", () => {
//     test("Serving", () => {
//         const pizza = new Pizza();

//         const fancyPizza = new FancyServingDecorator(pizza);

//         expect(fancyPizza.getCost()).toBe(400);

//         expect(fancyPizza.getDescription()).toBe("Pizza with fancy serving");

//         const salad = new Salad();

//         const fancySalad = new FancyServingDecorator(salad);

//         expect(fancySalad.getCost()).toBe(250);

//         expect(fancySalad.getDescription()).toBe("Salad with fancy serving");
//     });

//     test("Sauce", () => {
//         const pizza = new Pizza();

//         const saucePizza = new SauceDecorator(pizza);

//         saucePizza.switchSauce(true);

//         expect(saucePizza.getCost()).toBe(320);

//         expect(saucePizza.getDescription()).toBe("Pizza with sauce");

//         const salad = new Salad();

//         const sauceSalad = new SauceDecorator(salad);

//         sauceSalad.switchSauce();

//         expect(sauceSalad.getCost()).toBe(150);

//         expect(sauceSalad.getDescription()).toBe("Salad");
//     });

//     test("Cheese", () => {
//         const pizza = new Pizza();

//         const cheesePizza = new ExtraCheeseDecorator(pizza);

//         cheesePizza.switchCheese("extra");

//         expect(cheesePizza.getCost()).toBe(350);

//         expect(cheesePizza.getDescription()).toBe("Pizza with extra cheese");

//         const salad = new Salad();

//         const cheeseSalad = new ExtraCheeseDecorator(salad);

//         cheeseSalad.switchCheese("double");

//         expect(cheeseSalad.getCost()).toBe(230);

//         expect(cheeseSalad.getDescription()).toBe("Salad with double cheese");
//     });
// });

describe("Chain of decorators", () => {
    test("Chain: has sauce + extra cheese", () => {
        const pizza: EnhancedDish = new SauceDecorator(
            new ExtraCheeseDecorator(
                new Pizza()
            )
        );

        pizza.switchSauce?.(true);
        pizza.switchCheese?.("extra");

        expect(pizza.getCost()).toBe(370); // 300 (base) + 20 (sauce) + 50 (extra cheese)
        expect(pizza.getDescription()).toBe("Pizza with extra cheese with sauce");
    });

    // test("Chain: has sauce + extra cheese", () => {
    //     const pizza: EnhancedDish = new SauceDecorator(
    //         new ExtraCheeseDecorator(
    //             new Pizza()
    //         )
    //     );

    //     console.log('pizza.switchSauce', pizza.switchSauce);
    //     pizza.switchSauce?.(true);

    //     console.log('pizza.switchCheese', pizza.switchCheese);
    //     pizza.switchCheese?.("extra");

    //     expect(pizza.getCost()).toBe(370); // 300 (base) + 100 (fancy serving) + 20 (sauce) + 50 (extra cheese)

    //     expect(pizza.getDescription()).toBe("Pizza with extra cheese with sauce");
    // });

    // test("Chain: has sauce + double cheese + fancy", () => {
    //     const pizza: EnhancedDish = new FancyServingDecorator(
    //         new SauceDecorator(
    //             new ExtraCheeseDecorator(
    //                 new Pizza()
    //             )
    //         )
    //     );

    //     pizza.switchSauce?.(true);

    //     pizza.switchCheese?.("double");

    //     expect(pizza.getCost()).toBe(500); // 300 (base) + 100 (fancy serving) + 20 (sauce) + 80 (double cheese)

    //     expect(pizza.getDescription()).toBe("Pizza with extra cheese with sauce with fancy serving");
    // });
});

// describe("Invalid cheese amount", () => {
//     test("Invalid cheese amount", () => {
//         const pizza = new ExtraCheeseDecorator(new Pizza());

//         expect(() => pizza.switchCheese("triple" as any)).toThrow("Invalid cheese amount: triple");
//     });
// });
