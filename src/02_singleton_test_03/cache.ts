export interface ICache {
    [key: string]: any;
}

export class Cache {
    private static _instance: Cache;

    private _cache: ICache = {};

    private constructor() { };

    public static getInstance(): Cache {
        if (!this._instance) {
            this._instance = new Cache();
        }

        return this._instance;
    }

    public get(key: string): any {
        return this._cache[key];
    }

    public set(key: string, value: any): void {
        this._cache[key] = value;
    }

    public clear(key?: string): void {
        if (key) {
            delete this._cache[key];
        } else {
            this._cache = {};
        }
    }
}