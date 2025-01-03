import { IWeatherInfo } from "./IWeatherInfo";

import { IWeatherProvider } from "./IWeatherProvider";

import { LocationType, WeatherServiceB } from "./WeatherServiceB";

export class WeatherServiceBAdapter implements IWeatherProvider {
    private location: LocationType = 'New York';

    constructor(private readonly weatherServiceA = new WeatherServiceB()) { }

    getTemperature(): IWeatherInfo {
        const response = this.weatherServiceA.getTemperatureByLocation(this.location);

        const { temperature, unitOfMeasurement, location } = response;

        const temperatureInCelsius = unitOfMeasurement === 'F' ? Math.floor((temperature - 32) * 5 / 9) : temperature;

        const result: IWeatherInfo = {
            temperature: temperatureInCelsius,
            unitOfMeasurement: 'C',
            location,
        };

        return result;
    }
}
