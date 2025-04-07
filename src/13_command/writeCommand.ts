import { ICommand, ITextEditor } from "./types";

export class WriteCommand implements ICommand {
    private undoText: string = "";

    constructor(private textEditor: ITextEditor, private text: string) { }

    execute(): void {
        if (!this.text) return;

        this.undoText = this.textEditor.getText();

        this.textEditor.addText(this.text);
    }

    undo(): void {
        this.textEditor.setText(this.undoText);
    }
}
