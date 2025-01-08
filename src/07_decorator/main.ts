import { ExtraCheeseDecorator } from "./extraCheeseDecorator";

import { FancyServingDecorator } from "./fancyServingDecorator";

import { EnhancedDish } from "./IDish";

import { Pizza } from "./pizza";

import { Salad } from "./salad";

import { SauceDecorator } from "./sauceDecorator";

const pizza: EnhancedDish = new SauceDecorator(
    new ExtraCheeseDecorator(
        new Pizza()
    )
);

console.log('pizza.switchSauce', pizza.switchSauce);

console.log('pizza.switchCheese', pizza.switchCheese);

// const pizza = new Pizza();

// const pizzaWithSauce = new SauceDecorator(pizza);

// const fancyPizza = new FancyServingDecorator(pizzaWithSauce);

// console.log(fancyPizza.getDescription()); // "Pizza, with Sauce, with Fancy Serving"

// console.log(fancyPizza.getCost()); // 420 (300 + 20 + 100)

// pizzaWithSauce.switchSauce();

// console.log(fancyPizza.getDescription()); // "Pizza, with Sauce, with Fancy Serving"

// console.log(fancyPizza.getCost()); // 420 (300 + 20 + 100)

// const salad = new Salad();

// const saladWithSauce = new SauceDecorator(salad);

// saladWithSauce.switchSauce(true);

// const saladWithCheese = new ExtraCheeseDecorator(saladWithSauce);

// saladWithCheese.switchCheese('double');

// console.log(saladWithCheese.getDescription()); // "Salad, with sauce with double cheese"

// console.log(saladWithCheese.getCost()); // 190 (150 + 20 + 20)

// const extraPizza: EnhancedDish = new FancyServingDecorator(new SauceDecorator(new ExtraCheeseDecorator(new Pizza())));

// extraPizza.switchSauce?.();

