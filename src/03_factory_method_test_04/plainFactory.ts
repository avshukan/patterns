import { Plane } from './plane';

import { Transport } from './transport';

import { FactoryDetailsPlane, TransportFactory } from './transportFactory';

export class planeFactory extends TransportFactory<Transport> {
    _transportType = 'plane' as const;

    getTransportType(): string {
        return 'plane';
    }

    createTransport(details: FactoryDetailsPlane): Transport {
        const { businessSeatsCount, economySeatsCount, letters } = details;

        const plane = new Plane(businessSeatsCount, economySeatsCount, letters);

        return plane;
    }
}
