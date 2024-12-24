import { Train } from './train';

import { Transport } from './transport';

import { FactoryDetailsTrain, TransportFactory } from './transportFactory';

export class trainFactory extends TransportFactory<Transport> {
    _transportType = 'train' as const;

    public getTransportType(): string {
        return 'train';
    }

    createTransport(details: FactoryDetailsTrain): Transport {
        console.log('Creating train with details:', details);

        console.log(`Carriage count: ${details.carriageCount} and carriage capacity: ${details.carriageCapacity}`);

        const { carriageCount, carriageCapacity } = details;

        console.log(`Carriage count: ${carriageCount} and carriage capacity: ${carriageCapacity}`);

        const train = new Train(carriageCount, carriageCapacity);

        return train;
    }
}
