import { Transport } from './transport';

export class Ship implements Transport {
    deliver(): void {
        console.log('Delivering cargo by ship');
    }
}
