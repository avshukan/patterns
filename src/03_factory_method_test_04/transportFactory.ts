import type { Transport } from './transport';

export interface FactoryDetailsBus {
    seatsCount: number;
}

export interface FactoryDetailsTrain {
    carriageCount: number;
    carriageCapacity: number;
}

export interface FactoryDetailsPlane {
    businessSeatsCount: number;
    economySeatsCount: number;
    letters: string[];
}

export type FactoryDetails = FactoryDetailsBus | FactoryDetailsTrain | FactoryDetailsPlane;

export abstract class TransportFactory<T extends Transport> {
    abstract _transportType: 'bus' | 'train' | 'plane';

    public abstract getTransportType(): string;

    public abstract createTransport(details: FactoryDetails): T;
}
