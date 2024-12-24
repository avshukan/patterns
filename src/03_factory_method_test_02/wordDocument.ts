import { Document } from './document';

export class WordDocument implements Document {
    process(): void {
        console.log('Processing Word document');
    }
}
