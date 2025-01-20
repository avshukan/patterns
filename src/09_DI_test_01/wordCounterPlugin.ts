import { IPlugin } from "./interfaces";

export class WordCounterPlugin implements IPlugin {
    readonly name = 'wordCounterPlugin';

    handleText(text: string): string {
        const counter = text.split(' ').length;

        console.log(`Word count: ${counter}`);

        return text;
    }
}