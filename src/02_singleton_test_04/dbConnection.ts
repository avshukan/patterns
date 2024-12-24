export interface IDBConfig {
    host: string;
    port: number;
    dbname: string;
}

export class DBConnection {
    private static instance: DBConnection;

    private config: IDBConfig;

    private isConnected: boolean = false;

    private constructor(config: IDBConfig) {
        this.config = config;
    }

    public static getInstance(config?: IDBConfig): DBConnection {
        if (!this.instance) {
            if (!config) {
                throw new Error('DBConnection requires a configuration for the first initialization');
            }

            this.instance = new DBConnection(config);
        }

        return this.instance;
    }

    public connect(): void {
        if (this.isConnected) {
            console.log('Already connected');
            return;
        }

        this.isConnected = true;

        console.log(`Connected to ${this.config.host}:${this.config.port}/${this.config.dbname}`);
    }

    public disconnect(): void {
        if (!this.isConnected) {
            console.log('Already disconnected');
            return;
        }

        this.isConnected = false;

        console.log(`Disconnected from ${this.config.host}:${this.config.port}/${this.config.dbname}`);
    }
}
