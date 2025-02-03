import "reflect-metadata";

import { Container } from "inversify";

import { IDataService } from "./interfaces";

import { AccessControlProxyServiceToken, IDataServiceToken, RealDataServiceToken } from "./diTokens";

import { RealDataService } from "./RealDataService";

import { AccessControlProxyService } from "./AccessControlProxyService";

export const container = new Container();

container.bind<IDataService>(IDataServiceToken).to(AccessControlProxyService);

container.bind<AccessControlProxyService>(AccessControlProxyServiceToken).to(AccessControlProxyService);

container.bind<RealDataService>(RealDataServiceToken).to(RealDataService);
