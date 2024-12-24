import { Document } from './document';

export class PdfDocument implements Document {
    process(): void {
        console.log('Processing PDF document');
    }
}
