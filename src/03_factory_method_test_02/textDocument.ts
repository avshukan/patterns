import { Document } from './document';

export class TextDocument implements Document {
    process(): void {
        console.log('Processing Text document');
    }
}
