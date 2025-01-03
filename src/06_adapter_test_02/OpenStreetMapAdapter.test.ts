import { OpenStreetMapAdapter } from "./OpenStreetMapAdapter";

import { IGeolocationProvider } from "./IGeolocationProvider";

import { CONFIG } from "./config";

const mockServiceData = {
    fetchCoordinates: jest.fn(() => ({
        latitude: 2,
        longitude: 3,
    })),
};

describe('OpenStreetMapAdapter', () => {

    test('OpenStreetMapAdapter :: success', () => {
        const provider: IGeolocationProvider = new OpenStreetMapAdapter(mockServiceData, CONFIG.OPENSTREETMAP);

        const location = provider.getCurrentLocation();

        expect(location.latitude).toBe(2);

        expect(location.longitude).toBe(3);

        const details = provider.getLocationDetails();

        expect(details).toBe('Latitude: 2, Longitude: 3');
    });
});
