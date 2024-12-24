import { DocumentFactory } from './document';

import { WordDocument } from './wordDocument';

export class WordDocumentFactory extends DocumentFactory<WordDocument> {
    createDocument() {
        return new WordDocument();
    }
}
