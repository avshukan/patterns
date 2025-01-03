export class GoogleMapsService {
    public getLocation(): { lat: number; long?: number } {
        return { lat: 40.7128, long: -74.006 }; // Пример возвращаемого значения
    }
}
