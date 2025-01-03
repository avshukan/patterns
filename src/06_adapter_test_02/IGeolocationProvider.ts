import { IGeolocationResult } from "./IGeolocationResult";

export interface IGeolocationProvider {
    getCurrentLocation(): IGeolocationResult;

    getLocationDetails(): string;
}
