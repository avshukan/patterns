import { IWeatherData } from "./IWeatherData";

export interface IObserver {
    update(data: IWeatherData): void;
}
