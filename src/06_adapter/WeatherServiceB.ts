export type LocationType = 'London' | 'New York' | 'Paris' | 'Berlin';

export class WeatherServiceB {
    getTemperatureByLocation(location: LocationType): { temperature: number; unitOfMeasurement: 'C' | 'F'; location: string } {
        const temperature = Math.floor(Math.random() * 50) - 10;

        const unitOfMeasurement = Math.random() > 0.5 ? 'C' : 'F';

        return {
            temperature,
            unitOfMeasurement,
            location,
        };
    }
}