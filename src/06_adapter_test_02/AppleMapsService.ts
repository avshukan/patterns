export class AppleMapsService {
    public getCoordinates(): { latitude: number; longitude: number } | null {
        return { latitude: 37.7749, longitude: -122.4194 }; // Пример возвращаемого значения
    }
}
