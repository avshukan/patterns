import { IUser } from "./IUser"

import { IUserRepository } from "./IUserRepository";

export class UserRepository implements IUserRepository {
    private _store: Map<string, IUser>;

    constructor() {
        this._store = new Map();
    }

    public async findAll(): Promise<IUser[]> {
        return Array.from(this._store.values());
    }

    public async findById(id: string): Promise<IUser | null> {
        const user = this._store.get(id);

        return user || null;
    }

    public async create(user: IUser): Promise<IUser> {
        if (this._store.has(user.id)) {
            throw new Error('User already exists');
        }

        this._store.set(user.id, user);

        return user;
    }

    public async update(id: string, user: Partial<IUser>): Promise<IUser> {
        const oldUser = this._store.get(id);

        if (!oldUser) {
            throw new Error('User not found');
        }

        const updatedUser = {
            ...oldUser,
            ...user,
        };

        this._store.set(id, updatedUser);

        return updatedUser;
    }

    public async delete(id: string): Promise<boolean> {
        return this._store.delete(id);
    }

    public async filterAndSortUsers(
        filter?: Partial<IUser>,
        sortKey?: keyof IUser,
        sortDirection?: "asc" | "desc"
    ): Promise<IUser[]> {
        const users = Array.from(this._store.values())
            .filter((user) => {
                for (const key in filter) {
                    if (user[key as keyof IUser] !== filter[key as keyof IUser]) {
                        return false;
                    }
                }

                return true;
            })
            .sort((a, b) => {
                if (!sortKey) {
                    return 0;
                }

                if (a[sortKey] > b[sortKey]) {
                    return sortDirection === 'asc' ? 1 : -1;
                } else if (a[sortKey] < b[sortKey]) {
                    return sortDirection === 'asc' ? -1 : 1;
                } else {
                    return 0;
                }
            });

        return users;
    }
}
