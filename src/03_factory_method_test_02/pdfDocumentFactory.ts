import { PdfDocument } from './pdfDocument';

import { DocumentFactory } from './document';

export class PdfDocumentFactory extends DocumentFactory<PdfDocument> {
    createDocument(): PdfDocument {
        return new PdfDocument();
    }
}
