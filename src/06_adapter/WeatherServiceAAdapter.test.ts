import { IWeatherProvider } from "./IWeatherProvider";

import { WeatherServiceAAdapter } from "./WeatherServiceAAdapter";

describe('WeatherServiceAAdapter', () => {

    test('WeatherServiceAAdapter', () => {
        const provider: IWeatherProvider = new WeatherServiceAAdapter();

        const temperature = provider.getTemperature();

        expect(temperature).toHaveProperty('temperature');

        expect(temperature.unitOfMeasurement).toBe('C');
    });
});
