export class WeatherServiceA {
    info(): { temperature: number; unitOfMeasurement: 'C'; lastUpdated: number } {
        const temperature = Math.floor(Math.random() * 100);

        const unitOfMeasurement = 'C';

        const lastUpdated = Date.now();

        return {
            temperature,
            unitOfMeasurement,
            lastUpdated,
        };
    }
}