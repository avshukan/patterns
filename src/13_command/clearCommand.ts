import { ICommand, ITextEditor } from "./types";

export class ClearCommand implements ICommand {
    private undoText: string = "";

    constructor(private textEditor: ITextEditor) { }

    execute(): void {
        this.undoText = this.textEditor.getText();

        this.textEditor.setText("");
    }

    undo(): void {
        this.textEditor.setText(this.undoText);
    }
}
