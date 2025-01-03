export interface IWeatherInfo {
    temperature: number;
    unitOfMeasurement?: 'C' | 'F';
    lastUpdated?: number;
    location?: string;
}
