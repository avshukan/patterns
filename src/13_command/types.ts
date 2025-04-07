export interface ITextEditor {
    getText(): string;

    setText(text: string): void;

    addText(text: string): void;
}


export interface ICommand {
    execute(): void;
    undo(): void;
}


export interface ICommandHistory {
    execute(command: ICommand): void;
    undo(): void;
    redo(): void;
}
