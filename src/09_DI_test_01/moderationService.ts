import "reflect-metadata";

import { injectable } from "inversify";

import { IMessage, IModerationService, IModerationServiceConfig } from "./interfaces";

type UserStateType = "active" | "restricted" | "banned";

interface IUser {
    getState(): UserStateType;
    addWarningCase(): { userState: UserStateType, warningCases: Date[] };
}

class User implements IUser {
    private static _config: Partial<IModerationServiceConfig> = {
        warningInterval: 20,
        warningMessageCount: 3,
        banInterval: 60,
    };

    private _warningCases: Date[] = [];

    private _banCase: Date | null = null;

    public static applyConfig(config: Partial<IModerationServiceConfig>): void {
        this._config.warningInterval = config.warningInterval ?? this._config.warningInterval;
        this._config.warningMessageCount = config.warningMessageCount ?? this._config.warningMessageCount;
        this._config.banInterval = config.banInterval ?? this._config.banInterval;
    }

    private getBanCase(): Date | null {
        if (this._banCase === null) {
            return this._banCase;
        }

        if (Date.now() - this._banCase.getTime() > (User._config.banInterval ?? 0) * 1000) {
            this._banCase = null;
            return null;
        }

        return this._banCase;
    }

    private getWarningCases(): Date[] {
        this._warningCases = this._warningCases.filter(
            (date) => Date.now() - date.getTime() < (User._config.warningInterval ?? 0) * 1000
        );

        return this._warningCases;
    }

    public getState(): UserStateType {
        if (this.getBanCase()) {
            return "banned";
        }

        if (this.getWarningCases().length >= (User._config.warningMessageCount ?? 0)) {
            return "restricted";
        }

        return "active";
    }

    public addWarningCase(): { userState: UserStateType, warningCases: Date[] } {
        this._warningCases.push(new Date());

        if (this._warningCases.length >= (User._config.warningMessageCount ?? 0)) {
            this._banCase = new Date();
        }

        const userState = this.getState();

        const warningCases = this.getWarningCases();

        return { userState, warningCases };
    }
}

@injectable()
export class ModerationService implements IModerationService {
    private _config: IModerationServiceConfig = {} as IModerationServiceConfig;

    private _users = new Map<number, IUser>();

    constructor(_config: IModerationServiceConfig) {
        this._config = _config;

        User.applyConfig(_config);
    }

    moderate(message: IMessage): IMessage {
        const user = this.getUser(message.user);

        const userState: UserStateType = user.getState();

        if (userState === "banned") {
            throw new Error("User is banned");
        }

        const hasRestrictedWords = message.message.split(" ").some((word) => {
            return (this._config.restrictedWords ?? []).includes(word);
        });

        if (!hasRestrictedWords) {
            if (userState === "active" && this._users.has(message.user)) {
                this._users.delete(message.user);
            }

            return message;
        }

        const { userState: newUserState, warningCases } = user.addWarningCase();

        const moderatedMessage = message.message.split(" ").map((word) => {
            if ((this._config.restrictedWords ?? []).includes(word)) {
                return "*".repeat(word.length);
            }

            return word;
        }).join(" ");

        const warningMessage = `Message contains restricted words. Warning cases: ${warningCases.length}. User state: ${newUserState}.`;

        this._users.set(message.user, user);

        const resultMessage: IMessage = {
            message: `${moderatedMessage}\n${warningMessage}`,
            user: message.user,
            date: message.date,
        };

        return resultMessage;
    }

    private getUser(userId: number): IUser {
        if (!this._users.has(userId)) {
            this._users.set(userId, new User());
        }

        return this._users.get(userId) as IUser;
    }
}
