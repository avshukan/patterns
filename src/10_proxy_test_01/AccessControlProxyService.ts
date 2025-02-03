import "reflect-metadata";

import { inject, injectable } from "inversify";

import { Data, IDataService, Metadata, User } from "./interfaces";

import { RealDataServiceToken } from "./diTokens";

import { RealDataService } from "./RealDataService";

injectable()
export class AccessControlProxyService implements IDataService {
    constructor(
        @inject(RealDataServiceToken) private readonly _service: RealDataService,
    ) { }

    getData(user: User): Promise<Data | Metadata | Error> {
        if (user.role === "Admin") {
            return this._service.getData(user);
        }

        if (user.role === "Manager") {
            const data = this._service.getData(user);

            return data.then((d) => ({
                id: d.id,
                description: "This is metadata about the data",
            }));
        }

        return Promise.reject(new Error("Access denied."));
    }
}
