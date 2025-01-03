import { AppleMapsAdapter } from "./AppleMapsAdapter";

import { IGeolocationProvider } from "./IGeolocationProvider";

import { CONFIG } from "./config";

const mockServiceData = {
    getCoordinates: jest.fn(() => ({
        latitude: 2,
        longitude: 3,
    })),
};

const mockServiceNull = {
    getCoordinates: jest.fn(() => null),
};



describe('AppleMapsAdapter', () => {

    test('AppleMapsAdapter :: success', () => {
        const provider: IGeolocationProvider = new AppleMapsAdapter(mockServiceData, CONFIG.APPLEMAPS);

        const location = provider.getCurrentLocation();

        expect(location.latitude).toBe(2);

        expect(location.longitude).toBe(3);

        const details = provider.getLocationDetails();

        expect(details).toBe('Latitude: 2, Longitude: 3');
    });


    test('AppleMapsAdapter :: failure', () => {
        const provider: IGeolocationProvider = new AppleMapsAdapter(mockServiceNull, CONFIG.APPLEMAPS);

        expect(() => provider.getCurrentLocation()).toThrow('Failed to get coordinates from Apple Maps');

        expect(() => provider.getLocationDetails()).toThrow('Failed to get coordinates from Apple Maps');
    });
});
