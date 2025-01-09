import { WeatherStation } from "./WeatherStation";

test('Observers receive updates', () => {
    const station = new WeatherStation();

    const mockObserver = { update: jest.fn() };

    station.registerObserver(mockObserver);

    const data = { temperature: 70, humidity: 50, pressure: 1013 };

    station.notifyObservers(data);

    expect(mockObserver.update).toHaveBeenCalledWith(data);
});

test('Observer is removed and does not receive updates', () => {
    const station = new WeatherStation();

    const mockObserver = { update: jest.fn() };

    station.registerObserver(mockObserver);

    const data = { temperature: 70, humidity: 50, pressure: 1013 };

    station.notifyObservers(data);
    expect(mockObserver.update).toHaveBeenCalledWith(data);

    station.removeObserver(mockObserver);

    station.notifyObservers(data);
    expect(mockObserver.update).toHaveBeenCalledTimes(1); // Should not receive updates after removal
});
