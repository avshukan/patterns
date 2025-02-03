import "reflect-metadata";

import { injectable } from "inversify";

import { IWeatherInfo } from "./interfaces";

type CacheEntry = {
    timestamp: number;
    weather: IWeatherInfo;
};

@injectable()
export class CityWeatherCache {
    private _cacheWeather = new Map<string, CacheEntry>();

    constructor(
        private readonly _cacheTimeout: number = 1000,
        private readonly _cacheSize = 10,
    ) { }

    public get(city: string): IWeatherInfo | null {
        const currentTimestamp = Date.now();

        const data = this._cacheWeather.get(city);

        if (data && (currentTimestamp - (data.timestamp ?? 0) < this._cacheTimeout)) {
            return data.weather;
        }

        return null;
    }

    public set(city: string, weather: IWeatherInfo): void {
        const cacheEntry: CacheEntry = {
            timestamp: Date.now(),
            weather,
        };

        this._cacheWeather.set(city, cacheEntry);

        if (this._cacheWeather.size > this._cacheSize) {
            this.clearOutdated();
        }
    }


    private clearOutdated(): void {
        const currentTimestamp = Date.now();

        if (this._cacheWeather.size > this._cacheSize) {
            const oldestKey = Array.from(this._cacheWeather.keys())[0];
            this._cacheWeather.delete(oldestKey);
        }
    }
}
