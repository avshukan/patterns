import { AppleMapsService } from "./AppleMapsService";

import { GeolocationProvider } from "./GeolocationProvider";

import { IGeolocationProvider } from "./IGeolocationProvider";

import { IGeolocationResult } from "./IGeolocationResult";

export class AppleMapsAdapter extends GeolocationProvider implements IGeolocationProvider {
    constructor(
        private readonly _service: AppleMapsService,
        private readonly _config: any,
    ) {
        super();
    }

    public getCurrentLocation(): IGeolocationResult {
        const coordinates = this._service.getCoordinates();

        if (!coordinates) {
            throw new Error("Failed to get coordinates from Apple Maps");
        }

        return {
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
        };
    }
}
