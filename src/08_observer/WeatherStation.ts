import { IObserver } from "./IObserver";

import { IWeatherData } from "./IWeatherData";

import { IWeatherStation } from "./IWeatherStation";

export class WeatherStation implements IWeatherStation {
    private _observers: IObserver[] = [];

    private _data: IWeatherData[] = [];

    private _timeoutInterval: NodeJS.Timeout | null = null;

    launch(counter: number, timeout: number): void {
        let _counter = 0;

        this._timeoutInterval = setInterval(() => {
            _counter += 1;
            if (_counter >= counter && this._timeoutInterval) {
                clearInterval(this._timeoutInterval);
            }

            console.log('='.repeat(20));

            const prevData = this._data[this._data.length - 1] ?? {
                temperature: 0,
                humidity: 0,
                pressure: 0,
            };

            const data: IWeatherData = {
                temperature: Math.round(Math.min(50, Math.max(-30, prevData.temperature + (Math.random() - 0.5) * 10))),
                humidity: Math.round(Math.min(100, Math.max(0, prevData.humidity + (Math.random() - 0.5) * 5))),
                pressure: Math.round(Math.min(1100, Math.max(900, prevData.pressure + (Math.random() - 0.5) * 2))),
            };


            console.log('New data: temperature =', data.temperature, 'humidity =', data.humidity, 'pressure =', data.pressure);

            this._data.push(data);

            this.notifyObservers(data);
        }, timeout);
    }

    dislaunch(): void {
        if (this._timeoutInterval) {
            clearInterval(this._timeoutInterval);
        }
    }

    getData(): IWeatherData[] {
        return this._data;
    }

    registerObserver(observer: IObserver) {
        if (this._observers.includes(observer)) {
            console.warn("Observer already registered");
            return false;
        }

        this._observers.push(observer);

        return true;
    }

    removeObserver(observer: IObserver) {
        const index = this._observers.indexOf(observer);

        if (index === -1) {
            return false;
        }

        this._observers.splice(index, 1);

        return true;
    }

    notifyObservers(data: IWeatherData): boolean {
        let result = true;

        for (const observer of this._observers) {
            try {
                observer.update(data);
            } catch (error) {
                console.error(error);
                result = false;
            }
        }

        return result;

    }
}