import { Transport } from './transport';

export class Airplane implements Transport {
    deliver(): void {
        console.log('Delivering cargo by airplane');
    }
}
