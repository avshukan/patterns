import { UserManager } from './userManager';

const userManager = new UserManager();

userManager.addUser('Alice');

userManager.addUser('Bob');

console.log(userManager.getUsers());

userManager.logUserCount();
