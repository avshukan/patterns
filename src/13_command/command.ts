import { ICommand, ITextEditor } from "./types";

export abstract class Command implements ICommand {
    constructor(protected textEditor: ITextEditor) { }

    abstract execute(): void;

    abstract undo(): void;
}
