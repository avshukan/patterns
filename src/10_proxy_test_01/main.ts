import { container } from "./diConfig";

import { IDataService, User } from "./interfaces";

import { IDataServiceToken } from "./diTokens";

const service = container.get(IDataServiceToken) as IDataService;

const admin: User = {
    id: 2,
    name: "Alice",
    role: "Admin",
};

const manager: User = {
    id: 3,
    name: "Barbara",
    role: "Manager",
};

const customer: User = {
    id: 5,
    name: "Carol",
    role: "User",
};

const userToConsole = async (type: string, user: User) => {
    await service.getData(user)
        .then(data => console.log(type, user, data))
        .catch(error => console.log(type, user, error.message));
};

userToConsole('admin', admin);

userToConsole('manager', manager);

userToConsole('Customer', customer);
