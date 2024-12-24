import { IUser } from "./IUser"

import { IUserRepository } from "./IUserRepository";

import { UserRepository } from "./UserRepository";

describe('User Repository', () => {

    test('Empty Repository', async () => {
        const repo: IUserRepository = new UserRepository();

        expect(await repo.findAll()).toEqual([]);
    });

    test('Create User :: success', async () => {
        const repo: IUserRepository = new UserRepository();

        const user: IUser = {
            id: '1',
            name: 'John Doe',
            email: 'johndoe@mail.com'
        };

        await repo.create(user);

        expect(await repo.findAll()).toEqual([user]);
    });

    test('Create User :: failure', async () => {
        const repo: IUserRepository = new UserRepository();

        const user: IUser = {
            id: '1',
            name: 'John Doe',
            email: 'johndoe@mail.com'
        };

        await repo.create(user);

        await expect(repo.create(user)).rejects.toThrow();

        expect(await repo.findAll()).toEqual([user]);
    });

    test('Update User :: success', async () => {
        const repo: IUserRepository = new UserRepository();

        const user: IUser = {
            id: '1',
            name: 'John Doe',
            email: 'johndoe@mail.com'
        };

        await repo.create(user);

        const updatedUser = await repo.update('1', { name: 'John Smith' });

        expect(updatedUser).toEqual({
            id: '1',
            name: 'John Smith',
            email: 'johndoe@mail.com'
        });
    });

    test('Update User :: failure', async () => {
        const repo: IUserRepository = new UserRepository();

        const user: IUser = {
            id: '1',
            name: 'John Doe',
            email: 'johndoe@mail.com'
        };

        await repo.create(user);

        await expect(repo.update('2', { name: 'John Stone' })).rejects.toThrow();

        expect(await repo.findById(user.id)).toEqual(user);
    });

    test('Delete User :: success', async () => {
        const repo: IUserRepository = new UserRepository();

        const user: IUser = {
            id: '1',
            name: 'John Doe',
            email: 'johndoe@mail.com'
        };

        await repo.create(user);

        const deleteResult = await repo.delete('1');

        expect(deleteResult).toBe(true);

        expect(await repo.findAll()).toEqual([]);
    });

    test('Delete User :: failure', async () => {
        const repo: IUserRepository = new UserRepository();

        const user: IUser = {
            id: '1',
            name: 'John Doe',
            email: 'johndoe@mail.com'
        };

        await repo.create(user);

        const deleteResult = await repo.delete('3');

        expect(deleteResult).toBe(false);

        expect(await repo.findAll()).toEqual([user]);
    });

    test('Find User By Id :: success', async () => {
        const repo: IUserRepository = new UserRepository();

        const user: IUser = {
            id: '1',
            name: 'John Doe',
            email: 'johndoe@mail.com'
        };

        await repo.create(user);

        const foundUser = await repo.findById('1');

        expect(foundUser).toEqual(user);
    });

    test('Find User By Id :: failure', async () => {
        const repo: IUserRepository = new UserRepository();

        const user: IUser = {
            id: '1',
            name: 'John Doe',
            email: 'johndoe@mail.com'
        };

        await repo.create(user);

        expect(await repo.findById('3')).toBeNull();
    });

    test('Filter and sort empty repo', async () => {
        const repo: IUserRepository = new UserRepository();

        expect(await repo.filterAndSortUsers()).toEqual([]);
    });

    test('Filter by email', async () => {
        const repo: IUserRepository = new UserRepository();

        const user1: IUser = {
            id: '1',
            name: 'John Doe',
            email: 'johndoe@mail.com'
        };

        const user2: IUser = {
            id: '2',
            name: 'J Doe',
            email: 'johndoe@mail.com'
        };

        const user3: IUser = {
            id: '3',
            name: 'Jane Doe',
            email: 'janedoe@mail.com'
        };

        await repo.create(user1);

        await repo.create(user2);

        await repo.create(user3);

        expect(await repo.findAll()).toEqual([user1, user2, user3]);

        expect(await repo.filterAndSortUsers({ email: user1.email })).toEqual([user1, user2]);

        expect(await repo.filterAndSortUsers({ email: user1.email }, 'id', 'asc')).toEqual([user1, user2]);

        expect(await repo.filterAndSortUsers({ email: user1.email }, 'id', 'desc')).toEqual([user2, user1]);
    });

});
