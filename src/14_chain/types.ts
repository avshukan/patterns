export interface IUser {
    username: string;
    email: string;
    password: string;
}


export interface IHandler {
    setNext(nextHandler: IHandler): IHandler;
    handle(user: IUser): Promise<boolean>;
}


export interface IUserRepository {
    getUser(username: string): Promise<IUser | null>;
    addUser(user: IUser): Promise<void>;
    deleteUser(username: string): Promise<void>;
}
