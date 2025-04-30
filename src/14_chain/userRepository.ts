import { injectable } from "inversify";

import type { IUser, IUserRepository } from "./types";

@injectable()
export class UserRepository implements IUserRepository {
    private users: { [key: string]: IUser } = {};

    async addUser(user: IUser): Promise<void> {
        this.users[user.username] = user;
    }

    async getUser(username: string): Promise<IUser | null> {
        return Promise.resolve(this.users[username] ?? null);
    }

    async deleteUser(username: string): Promise<void> {
        delete this.users[username];
    }
}
