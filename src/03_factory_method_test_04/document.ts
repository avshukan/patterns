export interface Document {
    process(): void;
}

export abstract class DocumentFactory<T extends Document> {
    public abstract createDocument(): T;
}
