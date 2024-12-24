import { PdfDocumentFactory } from "./pdfDocumentFactory";

import { TextDocumentFactory } from "./textDocumentFactory";

import { WordDocumentFactory } from "./wordDocumentFactory";

export function getFactoryByExtension(extension: string) {
    switch (extension) {
        case '.docx':
            return new WordDocumentFactory();

        case '.pdf':
            return new PdfDocumentFactory();

        case '.txt':
            return new TextDocumentFactory();

        default:
            throw new Error('this extension is not supported');
    }
}