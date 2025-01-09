import { IObserver } from "./IObserver";

import { IWeatherData } from "./IWeatherData";

export class StatisticsDisplay implements IObserver {
    private _data: IWeatherData[] = [];

    update(data: IWeatherData): void {
        this._data.push(data);

        const minTemperature = Math.min(...this._data.map((d) => d.temperature));

        const avgTemperature = Math.round(this._data.reduce((acc, d) => acc + d.temperature, 0) / this._data.length);

        const maxTemperature = Math.max(...this._data.map((d) => d.temperature));

        console.log(`Min/Avg/Max temperature = ${minTemperature}/${avgTemperature}/${maxTemperature}`);
    }
}
