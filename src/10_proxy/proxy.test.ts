import { CachedWeatherService } from "./CachedWeatherService";

import { CityWeatherCache } from "./CityWeatherCache";

import { IWeatherService } from "./interfaces";

describe('CachedWeatherService', () => {
    let cityWeatherCache: CityWeatherCache;
    let realWeatherService: IWeatherService;
    let cachedWeatherService: CachedWeatherService;

    const londonWeather1 = { temperature: 20, humidity: 50, pressure: 1000 };
    const londonWeather2 = { temperature: 25, humidity: 55, pressure: 1005 };

    beforeEach(() => {
        cityWeatherCache = new CityWeatherCache();
        realWeatherService = {
            getWeather: jest.fn().mockResolvedValue(londonWeather1),
        };
        cachedWeatherService = new CachedWeatherService(realWeatherService, cityWeatherCache);
    });

    test('clears oldest entry when cache size exceeded', () => {
        const city1 = 'London';
        const city2 = 'New York';
        const city3 = 'Paris';

        cityWeatherCache = new CityWeatherCache(1000, 2); // маленький размер кэша
        cachedWeatherService = new CachedWeatherService(realWeatherService, cityWeatherCache);

        cachedWeatherService.getWeather(city1);
        cachedWeatherService.getWeather(city2);
        cachedWeatherService.getWeather(city3);

        expect(cityWeatherCache.get(city1)).toBeNull(); // первый город должен быть удалён
    });

    test('throws error if real weather service fails', async () => {
        jest.spyOn(realWeatherService, 'getWeather').mockRejectedValue(new Error('Service unavailable'));

        await expect(cachedWeatherService.getWeather('London')).rejects.toThrow('Service unavailable');
    });

    test('returns cached weather if available', async () => {
        // Симулируем наличие данных в кэше
        jest.spyOn(cityWeatherCache, 'get').mockReturnValue(londonWeather1);
        jest.spyOn(cityWeatherCache, 'set'); // Мы не ожидаем вызова set в этом случае

        const city = 'London';
        const weather = await cachedWeatherService.getWeather(city);

        // Проверяем, что данные вернулись из кэша
        expect(cityWeatherCache.get).toHaveBeenCalledWith(city);
        expect(realWeatherService.getWeather).not.toHaveBeenCalled();
        expect(cityWeatherCache.set).not.toHaveBeenCalled();
        expect(weather).toEqual(londonWeather1);
    });

    test('fetches weather from service if not cached', async () => {
        // Симулируем отсутствие данных в кэше
        jest.spyOn(cityWeatherCache, 'get').mockReturnValue(null);
        jest.spyOn(cityWeatherCache, 'set');

        const city = 'London';
        const weather = await cachedWeatherService.getWeather(city);

        // Проверяем, что данные вернулись из сервиса и были сохранены в кэш
        expect(cityWeatherCache.get).toHaveBeenCalledWith(city);
        expect(realWeatherService.getWeather).toHaveBeenCalledWith(city);
        expect(cityWeatherCache.set).toHaveBeenCalledWith(city, londonWeather1);
        expect(weather).toEqual(londonWeather1);
    });
});