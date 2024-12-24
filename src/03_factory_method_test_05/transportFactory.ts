import { BusDetails } from "./bus";

import { TrainDetails } from "./train";

import { Transport } from "./transport";

export type TransportDetails = BusDetails | TrainDetails;

export abstract class TransportFactory {
    abstract createTransport(details: TransportDetails): Transport;
}