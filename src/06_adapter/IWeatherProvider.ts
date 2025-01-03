import { IWeatherInfo } from "./IWeatherInfo";

export interface IWeatherProvider {
    getTemperature(): IWeatherInfo;
}
