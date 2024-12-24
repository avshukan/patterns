import { Airplane } from './airplane';

import { TransportFactory } from './transport';

export class AirplaneFactory extends TransportFactory<Airplane> {
    createTransport(): Airplane {
        return new Airplane();
    }
}
