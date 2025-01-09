import { IObserver } from "./IObserver";

import { IWeatherData } from "./IWeatherData";

export class ForecastDisplay implements IObserver {
    private _prevData: IWeatherData | null = null;

    private _lastData: IWeatherData | null = null;

    private calculateForecast(prevPressure?: number, lastPressure?: number, currentPressure?: number): number {
        const previous = prevPressure ?? lastPressure ?? currentPressure ?? 0;
        const last = lastPressure ?? currentPressure ?? 0;
        const current = currentPressure ?? 0;

        const diffLast = last ? (current - last) / 3 : 0;
        const diffPrev = previous ? (current - previous) / 9 : 0;

        return Math.round(current + diffLast + diffPrev);
    }


    update(data: IWeatherData): void {
        const forecastPressure = this.calculateForecast(this._prevData?.pressure, this._lastData?.pressure, data.pressure);

        console.log(`Forecast pressure: ${forecastPressure}`);

        this._prevData = this._lastData;

        this._lastData = data;
    }
}
