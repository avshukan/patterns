import { ICommand, ITextEditor } from "./types";

export class ReplaceCommand implements ICommand {
    private undoText: string = "";

    constructor(
        private textEditor: ITextEditor,
        private originalText: string,
        private replaceText: string
    ) { }

    execute(): void {
        const text = this.textEditor.getText();

        this.undoText = text;

        const newText = text.replace(this.originalText, this.replaceText);

        this.textEditor.setText(newText);
    }

    undo(): void {
        this.textEditor.setText(this.undoText);
    }
}
