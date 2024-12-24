import { Transport } from './transport';

export class Truck implements Transport {
    deliver(): void {
        console.log('Delivering cargo by truck');
    }
}
