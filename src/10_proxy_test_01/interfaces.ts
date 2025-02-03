export interface IDataService {
    getData(user: User): Promise<Data | Metadata | Error>;
}

export type UserRole = "Admin" | "Manager" | "User";

export type User = {
    id: number;
    name: string;
    role: UserRole;
};

export type Data = {
    id: number;
    secret: string;
};

export type Metadata = {
    id: number;
    description: string;
};
