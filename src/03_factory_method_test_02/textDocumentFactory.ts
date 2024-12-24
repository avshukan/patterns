import { TextDocument } from './textDocument';

import { DocumentFactory } from './document';

export class TextDocumentFactory extends DocumentFactory<TextDocument> {
    createDocument(): TextDocument {
        return new TextDocument();
    }
}
