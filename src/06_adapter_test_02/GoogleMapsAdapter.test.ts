import { GoogleMapsAdapter } from "./GoogleMapsAdapter";

import { IGeolocationProvider } from "./IGeolocationProvider";

import { CONFIG } from "./config";

const mockServiceData = {
    getLocation: jest.fn(() => ({
        lat: 2,
        long: 3,
    })),
};

const mockServiceNull = {
    getLocation: jest.fn(() => ({
        lat: 2,
    })),
};



describe('GoogleMapsAdapter', () => {

    test('GoogleMapsAdapter :: success', () => {
        const provider: IGeolocationProvider = new GoogleMapsAdapter(mockServiceData, CONFIG.GOOGLEMAPS);

        const location = provider.getCurrentLocation();

        expect(location.latitude).toBe(2);

        expect(location.longitude).toBe(3);

        const details = provider.getLocationDetails();

        expect(details).toBe('Latitude: 2, Longitude: 3');
    });


    test('GoogleMapsAdapter :: failure', () => {
        const provider: IGeolocationProvider = new GoogleMapsAdapter(mockServiceNull, CONFIG.GOOGLEMAPS);

        const location = provider.getCurrentLocation();

        expect(location.latitude).toBe(2);

        expect(location.longitude).toBe(0);

        const details = provider.getLocationDetails();

        expect(details).toBe('Latitude: 2, Longitude: 0');
    });
});
