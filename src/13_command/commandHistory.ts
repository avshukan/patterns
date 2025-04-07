import type { ICommand, ICommandHistory } from "./types";

export class CommandHistory implements ICommandHistory {
    private commands: ICommand[] = [];

    private undoCommands: ICommand[] = [];

    execute(command: ICommand): void {
        command.execute();

        this.commands.push(command);

        this.undoCommands = [];
    }

    undo(): void {
        const command = this.commands.pop();

        if (command) {
            this.undoCommands.push(command);

            command.undo();
        }
    }

    redo(): void {
        const command = this.undoCommands.pop();

        if (command) {
            this.commands.push(command);

            command.execute();
        }
    }
}
