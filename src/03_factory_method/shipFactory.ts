import { Ship } from './ship';

import { TransportFactory } from './transport';

export class ShipFactory extends TransportFactory<Ship> {
    createTransport(): Ship {
        return new Ship();
    }
}
