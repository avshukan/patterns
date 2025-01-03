import { IWeatherInfo } from "./IWeatherInfo";

import { IWeatherProvider } from "./IWeatherProvider";

import { WeatherServiceAAdapter } from "./WeatherServiceAAdapter";

import { WeatherServiceBAdapter } from "./WeatherServiceBAdapter";

const providers = [WeatherServiceAAdapter, WeatherServiceBAdapter];

providers.forEach(provider => {
    const weatherProvider: IWeatherProvider = new provider();

    const temperature: IWeatherInfo = weatherProvider.getTemperature();

    console.log(temperature);
});