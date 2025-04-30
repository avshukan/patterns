import "reflect-metadata";

import { Container } from "inversify";

import type { IHandler, IUserRepository } from "./types";

import {
    EmailValidatorToken,
    IUserRepositoryToken,
    PasswordValidatorToken,
    UserExistsValidatorToken,
    UsernameValidatorToken
} from "./diTokens";

import { UserRepository } from "./userRepository";

import { EmailValidator } from "./emailValidator";

import { PasswordValidator } from "./passwordValidator";

import { UserExistsValidator } from "./userExistsValidator";

import { UsernameValidator } from "./usernameValidator";


export const container = new Container();

container.bind<IUserRepository>(IUserRepositoryToken).to(UserRepository);

container.bind<IHandler>(EmailValidatorToken).to(EmailValidator)

container.bind<IHandler>(PasswordValidatorToken).to(PasswordValidator);

container.bind<IHandler>(UserExistsValidatorToken).to(UserExistsValidator);

container.bind<IHandler>(UsernameValidatorToken).to(UsernameValidator);
