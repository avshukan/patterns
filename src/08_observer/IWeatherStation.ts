import { IObserver } from "./IObserver";

import { IWeatherData } from "./IWeatherData";

export interface IWeatherStation {
    launch(counter: number, timeout: number): void;

    registerObserver(observer: IObserver): boolean;

    removeObserver(observer: IObserver): boolean;

    notifyObservers(data: IWeatherData): boolean;
}
