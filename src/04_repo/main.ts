import { Transport, TransportFactory } from './transport';

import { TruckFactory } from './truckFactory';

import { ShipFactory } from './shipFactory';

import { AirplaneFactory } from './airplaneFactory';

const randomFactor = Math.floor(10 * Math.random());

const factory: TransportFactory<Transport> = randomFactor < 2
    ? new TruckFactory()
    : randomFactor < 4
        ? new ShipFactory()
        : new AirplaneFactory();

console.log('factory', factory.constructor.name);

const transport = factory.createTransport();

transport.deliver(); // "Delivering cargo by truck" или "Delivering cargo by ship"
