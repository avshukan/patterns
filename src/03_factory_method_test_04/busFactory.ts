import { Bus } from './bus';

import { Transport } from './transport';

import { FactoryDetailsBus, TransportFactory } from './transportFactory';

export class busFactory extends TransportFactory<Transport> {
    _transportType = 'bus' as const;

    public getTransportType(): string {
        return 'bus';
    }

    createTransport(details: FactoryDetailsBus): Transport {
        this._transportType = 'bus';

        const seatsCount = details.seatsCount;

        const bus = new Bus(seatsCount);

        return bus;
    }
}
