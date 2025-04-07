import { container } from "./diConfig";

import type { ICommandHistory, ITextEditor } from "./types";

import { ICommandHistoryToken, ITextEditorToken } from "./diTokens";

import { WriteCommand } from "./writeCommand";

import { DeleteLastCharCommand } from "./deleteLastCharCommand";

import { ClearCommand } from "./clearCommand";
import { ReplaceCommand } from "./replaceCommand";
import { MacroCommand } from "./macroCommand";


const editor = container.get<ITextEditor>(ITextEditorToken);

const history = container.get<ICommandHistory>(ICommandHistoryToken);

console.log(editor.getText()); // "


const writeHello = new WriteCommand(editor, "Hello");
history.execute(writeHello); // Текст: "Hello"
console.log(editor.getText()); // "Hello"

const deleteLast = new DeleteLastCharCommand(editor);
history.execute(deleteLast); // Текст: "Hell"
console.log(editor.getText()); // "Hell"

history.undo(); // Текст: "Hello" (восстановили)
console.log(editor.getText()); // "Hello"

history.execute(
    new WriteCommand(editor, ", ?")
); // Текст: "Hello, "
console.log(editor.getText()); // "Hello, ?"

history.execute(
    new DeleteLastCharCommand(editor)
); // Текст: "Hello, "
console.log(editor.getText()); // "Hello, "

history.execute(
    new WriteCommand(editor, "world")
); // Текст: "Hello, world"
console.log(editor.getText()); // "Hello, world"

history.undo(); // Текст: "Hello, "
console.log(editor.getText()); // "Hello, "

history.undo(); // Текст: "Hello, ?"
console.log(editor.getText()); // "Hello, ?"

history.undo(); // Текст: "Hello"
console.log(editor.getText()); // "Hello"

history.redo(); // Текст: "Hello, ?"
console.log(editor.getText()); // "Hello, ?"

history.redo(); // Текст: "Hello, world"
console.log(editor.getText()); // "Hello, world"

history.execute(
    new ClearCommand(editor)
); // Текст: ""
console.log(editor.getText()); // ""

history.undo(); // Текст: "Hello, world"
console.log(editor.getText()); // "Hello, world"

history.execute(
    new ReplaceCommand(editor, "world", "Dolly")
)
console.log(editor.getText()); // "Hello, Dolly"

history.execute(
    new MacroCommand([
        new ReplaceCommand(editor, ",", " - "),
        new WriteCommand(editor, " This is the end"),
    ])
);
console.log(editor.getText()); // "Hello -  Dolly This is the end"

history.undo(); // Текст: "Hello, Dolly"
console.log(editor.getText()); // "Hello, Dolly"
