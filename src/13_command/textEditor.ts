import { ITextEditor } from "./types";

export class TextEditor implements ITextEditor {
    private text: string = "";

    getText(): string {
        return this.text;
    }

    setText(text: string): void {
        this.text = text;
    }

    addText(text: string): void {
        this.text += text;
    }
}
