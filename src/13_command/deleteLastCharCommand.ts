import { ICommand, ITextEditor } from "./types";

export class DeleteLastCharCommand implements ICommand {
    private undoText: string = "";

    constructor(private textEditor: ITextEditor) { }

    execute(): void {
        const text = this.textEditor.getText();

        if (text.length === 0) {
            return;
        }

        this.undoText = text;

        this.textEditor.setText(text.slice(0, -1));
    }

    undo(): void {
        this.textEditor.setText(this.undoText);
    }
}
