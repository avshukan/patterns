export interface IWeatherInfo {
    temperature: number;
    humidity: number;
    pressure: number;
}

export interface IWeatherService {
    getWeather(city: string): Promise<IWeatherInfo>;
}
