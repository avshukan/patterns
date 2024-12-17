import { ITask, TaskManager } from "./taskManager";

const taskManager = new TaskManager();

const task1: ITask = taskManager.addTask('Task 1');

console.log('Added task:', task1);

const task2 = taskManager.addTask('Task 2');

console.log('Added task:', task2);

const task3 = taskManager.addTask('Task 3');

console.log('Added task:', task3);

console.log(taskManager.getTasks());

const completedTask1 = taskManager.completeTask(task1.id);

console.log('Completed task:', completedTask1);

const completedTask5 = taskManager.completeTask(5);

console.log('Completed task:', completedTask5);

console.log(taskManager.getTasks());

const deletedTask2 = taskManager.deleteTaskByName('Task 2');

console.log('Deleted task:', deletedTask2);

const deletedTask4 = taskManager.deleteTaskById(4);

console.log('Deleted task:', deletedTask4);

console.log(taskManager.getTasks());