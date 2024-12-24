import { IUser } from "./IUser";
import { IUserRepository } from "./IUserRepository";

import { UserRepository } from "./UserRepository";

const repo: IUserRepository = new UserRepository();

const user1: IUser = {
    id: "1",
    name: "John Doe",
    email: "johndoe@mail.com"
};

const user2: IUser = {
    id: "2",
    name: "Jane Doe",
    email: "janedoe@mail.com"
};

(async () => {
    await repo.create(user1);

    console.log(await repo.findAll());

    await repo.create(user2);

    console.log(await repo.findAll());

    console.log(await repo.findById("1"));

    console.log(await repo.update("1", { name: "John Smith" }));

    console.log(await repo.delete("2"));

    console.log(await repo.findAll());
})();