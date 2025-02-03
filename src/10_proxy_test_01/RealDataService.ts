import { injectable } from "inversify";

import { Data, IDataService, User } from "./interfaces";

@injectable()
export class RealDataService implements IDataService {
    public async getData(user: User): Promise<Data> {
        return {
            id: user.id,
            secret: "This is confidential data!",
        };
    }
}