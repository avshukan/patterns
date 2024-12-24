import { Bus, BusDetails } from './bus';

import { TransportFactory } from './transportFactory';

export class BusFactory extends TransportFactory {
    createTransport(details: BusDetails): Bus {
        return new Bus(details);
    }
}
