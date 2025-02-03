import "reflect-metadata";

import { inject } from "inversify";

import { IWeatherInfo, IWeatherService } from "./interfaces";

import { CityWeatherCacheToken, IWeatherServiceToken } from "./diTokens";

import { CityWeatherCache } from "./CityWeatherCache";

export class CachedWeatherService implements IWeatherService {
    constructor(
        @inject(IWeatherServiceToken) private readonly _weatherService: IWeatherService,
        @inject(CityWeatherCacheToken) private readonly _cityWeatherCache: CityWeatherCache,
    ) { }

    public async getWeather(city: string): Promise<IWeatherInfo> {
        const weather = await this._cityWeatherCache.get(city);

        if (weather) {
            return weather;
        }

        const realWeather = await this._weatherService.getWeather(city);

        this._cityWeatherCache.set(city, realWeather);

        return realWeather;
    }
}
