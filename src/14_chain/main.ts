import { container } from "./diConfig";

import type { IHandler, IUser } from "./types";

import {
    EmailValidatorToken,
    PasswordValidatorToken,
    UserExistsValidatorToken,
    UsernameValidatorToken
} from "./diTokens";

const usernameValidator = container.get<IHandler>(UsernameValidatorToken);

const emailValidator = container.get<IHandler>(EmailValidatorToken);

const passwordValidator = container.get<IHandler>(PasswordValidatorToken);

const userExistsValidator = container.get<IHandler>(UserExistsValidatorToken);

const chain: IHandler = usernameValidator
    .setNext(emailValidator)
    .setNext(passwordValidator)
    .setNext(userExistsValidator);

const user: IUser = {
    username: 'john',
    email: 'john@example.com',
    password: '12345678'
};


chain.handle(user)
    .then(() => {
        console.log('User is valid');
    })
    .catch((error) => {
        console.error('User is invalid:', error);
    });
//
