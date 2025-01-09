import { IObserver } from "./IObserver";

import { IWeatherData } from "./IWeatherData";

export class CurrentConditionsDisplay implements IObserver {
    update(data: IWeatherData): void {
        console.log(`Current conditions: ${data.temperature}F degrees and ${data.humidity}% humidity`);
    }
}
