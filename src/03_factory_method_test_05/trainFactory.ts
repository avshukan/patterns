import { Train, TrainDetails } from './train';

import { TransportFactory } from './transportFactory';

export class TrainFactory extends TransportFactory {
    createTransport(details: TrainDetails): Train {
        return new Train(details);
    }
}
