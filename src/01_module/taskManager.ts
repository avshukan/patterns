export const TaskStatus = {
    Processing: 'processing',
    Done: 'done',
} as const;

export type TaskStatusType = typeof TaskStatus[keyof typeof TaskStatus];

export interface ITask {
    id: number;
    name: string;
    status: TaskStatusType;
}

export class TaskManager {
    private _taskCounter: number = 0;

    private _tasks: ITask[] = [];

    private findTask(id: number): ITask | undefined {
        return this._tasks.find(task => task.id === id);
    }

    addTask(name: string): ITask {
        if (name.trim() === '') {
            throw new Error('Task name cannot be empty');
        }

        const id = this._taskCounter++;

        const task: ITask = {
            id,
            name,
            status: TaskStatus.Processing,
        };

        this._tasks.push(task);

        return task;
    }

    getTasks(): ITask[] {
        return this._tasks;
    }

    getTaskById(id: number): ITask | null {
        return this.findTask(id) || null;
    }

    completeTask(id: number): ITask | null {
        const task = this.findTask(id);

        if (!task) {
            return null;
        }

        task.status = TaskStatus.Done;

        return task;
    }

    deleteTaskById(id: number): boolean {
        const taskIndex = this._tasks.findIndex(task => task.id === id);

        if (taskIndex === -1) {
            return false;
        }

        this._tasks.splice(taskIndex, 1);

        return true;
    }

    deleteTaskByName(name: string): boolean {
        const taskIndex = this._tasks.findIndex(task => task.name === name);

        if (taskIndex === -1) {
            return false;
        }

        this._tasks.splice(taskIndex, 1);

        return true;
    }
}