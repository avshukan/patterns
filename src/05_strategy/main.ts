import { EmailValidationStrategy } from "./EmailValidationStrategy";

import { FormValidator } from "./FormValidator";

import { NameValidationStrategy } from "./NameValidationStrategy";

import { PhoneValidationStrategy } from "./PhoneValidationStrategy";

import { PrimeNumberValidationStrategy } from "./PrimeNumberValidationStrategy";

const emailStrategy = new EmailValidationStrategy();

const phoneStrategy = new PhoneValidationStrategy();

const nameStrategy = new NameValidationStrategy();

const validator = new FormValidator();

validator.setValidationStrategy(emailStrategy);

console.log(validator.validateInput("x@x.com")); // true

console.log(validator.validateInput("Hello world!")); // false

validator.setValidationStrategy(phoneStrategy);

console.log(validator.validateInput("1234567890")); // true

console.log(validator.validateInput("123456789")); // false

validator.setValidationStrategy(nameStrategy);

console.log(validator.validateInput("John Doe")); // true

console.log(validator.validateInput("John Doe 123")); // false

validator.setValidationStrategy(new PrimeNumberValidationStrategy());

console.log(validator.validateInput(5)); // true

console.log(validator.validateInput(10)); // false
