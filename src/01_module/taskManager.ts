export type Task = {
    id: number;
    name: string;
    status: 'processing' | 'done';
}

export class TaskManager {
    private _taskCounter: number = 0;

    private _tasks: Task[] = [];

    addTask(name: string) {
        const id = this._taskCounter++;

        const task: Task = {
            id,
            name,
            status: 'processing',
        };

        this._tasks.push(task);
    }

    getTasks() {
        return this._tasks;
    }

    deleteTaskByName(name: string) {
        this._tasks = this._tasks.filter(task => task.name !== name);
    }
}