export interface ILogs extends Array<string> { };

export class Logger {
    private static _instance: Logger;

    private _log: ILogs = [];

    private constructor() { };

    public static getInstance(): Logger {
        if (!this._instance) {
            this._instance = new Logger();
        }

        return this._instance;
    }

    public getLogs(): ILogs {
        return this._log
    }

    public log(message: string): void {
        this._log.push(message);
    }
}