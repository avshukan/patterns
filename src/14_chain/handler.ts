import { IHandler, IUser } from "./types";


export abstract class Handler implements IHandler {
    protected nextHandler: IHandler | null = null;

    setNext(nextHandler: IHandler): this {
        if (!this.nextHandler) {
            this.nextHandler = nextHandler;
        } else {
            this.nextHandler.setNext(nextHandler);
        }

        return this;
    }

    abstract handle(user: IUser): Promise<boolean>;
}
