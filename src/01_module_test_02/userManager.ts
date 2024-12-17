interface IUser {
    name: string;
}

export class UserManager {
    private users: IUser[] = [];

    addUser(name: string): IUser {
        const user: IUser = { name };

        this.users.push(user);

        return user;
    }

    getUsers(): IUser[] {
        return this.users;
    }

    logUserCount(): void {
        console.log(`Total users: ${this.users.length}`);
    }
}
