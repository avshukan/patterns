import { IWeatherInfo } from "./IWeatherInfo";

import { IWeatherProvider } from "./IWeatherProvider";

import { WeatherServiceA } from "./WeatherServiceA";

export class WeatherServiceAAdapter implements IWeatherProvider {
    constructor(private readonly weatherServiceA = new WeatherServiceA()) { }

    getTemperature(): IWeatherInfo {
        const response = this.weatherServiceA.info();

        const result: IWeatherInfo = {
            temperature: response.temperature,
            unitOfMeasurement: response.unitOfMeasurement,
            lastUpdated: response.lastUpdated
        };

        return result;
    }
}
