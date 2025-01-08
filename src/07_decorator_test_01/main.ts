import { CheeseDecorator } from "./cheeseDecorator";

import { EnhancedDish } from "./IDish";

import { Pizza } from "./pizza";

import { SauceDecorator } from "./sauceDecorator";

let cost;

const pizza: EnhancedDish = SauceDecorator(
    CheeseDecorator(
        new Pizza()
    )
);

console.log('pizza.switchSauce', pizza.setSauce);

console.log('pizza.switchCheese', pizza.setCheese);

console.log('='.repeat(40));

cost = pizza.getCost();

console.log('cost', cost);

console.log('='.repeat(40));

pizza.setSauce?.(true);

cost = pizza.getCost();

console.log('cost', cost);

console.log('='.repeat(40));

pizza.setCheese?.(true);

cost = pizza.getCost();

console.log('cost', cost);

console.log('='.repeat(40));


const pizza2: EnhancedDish = CheeseDecorator(
    SauceDecorator(
        new Pizza()
    )
);

console.log('pizza2.switchSauce', pizza2.setSauce);

console.log('pizza2.switchCheese', pizza2.setCheese);

console.log('='.repeat(40));

cost = pizza2.getCost();

console.log('cost', cost);

console.log('='.repeat(40));

pizza2.setSauce?.(true);

cost = pizza2.getCost();

console.log('cost', cost);

console.log('='.repeat(40));

pizza2.setCheese?.(true);

cost = pizza2.getCost();

console.log('cost', cost);

console.log('='.repeat(40));