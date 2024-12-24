export interface Transport {
    deliver(): void;
}

export abstract class TransportFactory<T extends Transport> {
    public abstract createTransport(): T;
}
