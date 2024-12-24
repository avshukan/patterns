import { TransportFactory } from './transport';

import { Truck } from './truck';

export class TruckFactory extends TransportFactory<Truck> {
    createTransport() {
        return new Truck();
    }
}
