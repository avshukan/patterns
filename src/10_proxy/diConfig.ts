import "reflect-metadata";

import { Container } from "inversify";

import { IWeatherService } from "./interfaces";

import { CachedWeatherServiceToken, CityWeatherCacheToken, IWeatherServiceToken, RealWeatherServiceToken } from "./diTokens";

import { RealWeatherService } from "./RealWeatherService";

import { CachedWeatherService } from "./CachedWeatherService";

import { CityWeatherCache } from "./CityWeatherCache";

export const container = new Container();

container.bind<CityWeatherCache>(CityWeatherCacheToken).toDynamicValue(() => {
    return new CityWeatherCache(5000, 20); // настраиваемый таймаут и размер
});

container.bind<IWeatherService>(IWeatherServiceToken).to(CachedWeatherService);

container.bind<CachedWeatherService>(CachedWeatherServiceToken).to(CachedWeatherService);

container.bind<RealWeatherService>(RealWeatherServiceToken).to(RealWeatherService);
