import { GeolocationProvider } from "./GeolocationProvider";

import { GoogleMapsService } from "./GoogleMapsService";

import { IGeolocationProvider } from "./IGeolocationProvider";

import { IGeolocationResult } from "./IGeolocationResult";

export class GoogleMapsAdapter extends GeolocationProvider implements IGeolocationProvider {
    constructor(
        private readonly _service: GoogleMapsService,
        private readonly _config: any,
    ) {
        super();
    }

    public getCurrentLocation(): IGeolocationResult {
        const location = this._service.getLocation();

        return {
            latitude: location.lat ?? this._config.DEFAULTS.LATITUDE,
            longitude: location.long ?? this._config.DEFAULTS.LONGITUDE,
        };
    }
}
