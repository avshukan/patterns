export interface IConfigInstance {
    [key: string]: any;
}

export class ConfigManager {
    private static _instance: ConfigManager;

    private _config: IConfigInstance = {};

    private constructor() { };

    public static getInstance(): ConfigManager {
        if (!this._instance) {
            this._instance = new ConfigManager();
        }

        return this._instance;
    }

    public get(key: string): any {
        return this._config[key];
    }

    public set(key: string, value: any): void {
        this._config[key] = value;
    }
}