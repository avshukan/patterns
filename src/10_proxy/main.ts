import { container } from "./diConfig";

import { CachedWeatherServiceToken } from "./diTokens";

import { IWeatherService } from "./interfaces";

const service: IWeatherService = container.get(CachedWeatherServiceToken);

const cities = ["London", "New York", "Berlin", "Paris", "Tokyo"];

const steps = 10;

let counter = 0;

const timeInterval = setInterval(async () => {
    const city = cities[Math.floor(Math.random() * cities.length)];

    const weather = await service.getWeather(city);

    console.log(city, weather);

    counter++;

    if (counter >= steps) {
        clearInterval(timeInterval);
    }
}, 500);
