import { ICommand, ITextEditor } from "./types";

export class MacroCommand implements ICommand {
    constructor(private commands: ICommand[]) { }

    execute(): void {
        for (let command of this.commands) {
            command.execute();
        }
    }

    undo(): void {
        for (let command of [...this.commands].reverse()) {
            command.undo();
        }

    }
}
