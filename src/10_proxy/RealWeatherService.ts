import "reflect-metadata";

import { injectable } from "inversify";

import { IWeatherInfo, IWeatherService } from "./interfaces";

@injectable()
export class RealWeatherService implements IWeatherService {
    public async getWeather(city: string): Promise<IWeatherInfo> {
        if (Math.random() < 0.1) {
            throw new Error(`Failed to fetch weather for city: ${city}`);
        }

        const data: IWeatherInfo = {
            temperature: Math.floor(Math.random() * 40 - 10),
            humidity: Math.floor(Math.random() * 100),
            pressure: Math.floor(Math.random() * 1000),
        };

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(data);
            }, 200);
        });
    }
}
