import { IGeolocationProvider } from "./IGeolocationProvider";

import { IGeolocationResult } from "./IGeolocationResult";

export abstract class GeolocationProvider implements IGeolocationProvider {
    public abstract getCurrentLocation(): IGeolocationResult;

    public getLocationDetails(): string {
        const location = this.getCurrentLocation();

        const { latitude, longitude } = location;

        const details = `Latitude: ${latitude}, Longitude: ${longitude}`;

        return details;
    }

}
