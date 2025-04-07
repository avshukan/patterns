import "reflect-metadata";

import { Container } from "inversify";

import type { ICommandHistory, ITextEditor } from "./types";

import { ICommandHistoryToken, ITextEditorToken } from "./diTokens";

import { TextEditor } from "./textEditor";

import { CommandHistory } from "./commandHistory";

export const container = new Container();

container.bind<ITextEditor>(ITextEditorToken).to(TextEditor);

container.bind<ICommandHistory>(ICommandHistoryToken).to(CommandHistory);
