import { TaskManager } from "./taskManager";

const taskManager = new TaskManager();

taskManager.addTask('Task 1');

taskManager.addTask('Task 2');

taskManager.addTask('Task 3');

console.log(taskManager.getTasks());

taskManager.deleteTaskByName('Task 2');

console.log(taskManager.getTasks());