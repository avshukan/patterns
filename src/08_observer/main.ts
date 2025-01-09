import { CurrentConditionsDisplay } from "./CurrentConditionsDisplay";
import { ForecastDisplay } from "./ForecastDisplay";
import { StatisticsDisplay } from "./StatisticsDisplay";
import { WeatherStation } from "./WeatherStation";

const station = new WeatherStation();

const currentDisplay = new CurrentConditionsDisplay();

const statDisplay = new StatisticsDisplay();

const forecastDisplay = new ForecastDisplay();

station.registerObserver(currentDisplay);

station.registerObserver(statDisplay);

station.registerObserver(forecastDisplay);

station.launch(10, 1000);

setTimeout(() => {
    station.removeObserver(currentDisplay);
}, 5000);