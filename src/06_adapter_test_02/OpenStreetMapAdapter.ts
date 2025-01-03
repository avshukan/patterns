import { GeolocationProvider } from "./GeolocationProvider";

import { IGeolocationProvider } from "./IGeolocationProvider";

import { IGeolocationResult } from "./IGeolocationResult";

import { OpenStreetMapService } from "./OpenStreetMapService";

export class OpenStreetMapAdapter extends GeolocationProvider implements IGeolocationProvider {
    constructor(
        private readonly _service: OpenStreetMapService,
        private readonly _config: any,
    ) {
        super();
    }

    public getCurrentLocation(): IGeolocationResult {
        const { latitude, longitude } = this._service.fetchCoordinates();

        return {
            latitude,
            longitude,
        };
    }
}
