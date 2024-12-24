import { IUser } from "./IUser"

export interface IUserRepository {
    findAll(): Promise<IUser[]>;
    findById(id: string): Promise<IUser | null>;
    create(user: IUser): Promise<IUser>;
    update(id: string, user: Partial<IUser>): Promise<IUser | null>;
    delete(id: string): Promise<boolean>;
    filterAndSortUsers(
        filter?: Partial<IUser>,
        sortKey?: keyof IUser,
        sortDirection?: "asc" | "desc"
    ): Promise<IUser[]>;
}
