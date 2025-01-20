import { IPlugin } from "./interfaces";

type emojiType = [RegExp, string];

const emojiMapArray: Array<emojiType> = [
    [/:\)/, '😀'],
    [/:D/, '👍'],
    [/<3/, '❤️'],
];

export class EmojiPlugin implements IPlugin {
    private _emojiMap = emojiMapArray;

    readonly name = 'emojiPlugin';

    handleText(text: string): string {
        const handledText = this._emojiMap
            .reduce((acc: string, [regexp, value]: emojiType) => {
                const newRegexp = new RegExp(regexp, 'g');

                acc = acc.replace(newRegexp, value as string);

                return acc;
            }, text);

        return handledText;
    }
}