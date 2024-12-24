export interface IDBConfig {
    host: string;
    port: number
    dbname: string;
}

export class DatabaseConnection {
    private static _instance: DatabaseConnection;

    private constructor(readonly _config: IDBConfig) { };

    public static getInstance(config?: IDBConfig): DatabaseConnection {
        if (config) {
            this._instance = new DatabaseConnection(config);
        }

        if (!this._instance) {
            throw new Error('Database connection not initialized early and no config provided');
        }

        return this._instance;
    }

    public connect(): DatabaseConnection {
        console.log('Database connection established');
        return this;
    }

    public disconnect(): void {
        console.log('Database connection closed');
    }
}