import { IWeatherProvider } from "./IWeatherProvider";

import { WeatherServiceBAdapter } from "./WeatherServiceBAdapter";

describe('WeatherServiceBAdapter', () => {
    test('Returns temperature in Celsius', () => {
        const adapter = new WeatherServiceBAdapter();

        const temperature = adapter.getTemperature();

        expect(temperature).toHaveProperty('temperature');

        expect(temperature.unitOfMeasurement).toBe('C');
    });
});
