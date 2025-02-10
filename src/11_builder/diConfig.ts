import "reflect-metadata";

import { Container } from "inversify";

import { IHttpClient, IHttpClientBuilder } from "./interfaces";

import { HttpClientBuilderToken, HttpClientToken, IHttpClientBuilderToken, IHttpClientToken } from "./diTokens";

import { HttpClient } from "./HttpClient";

import { HttpClientBuilder } from "./HttpClientBuilder";

export const container = new Container();

container.bind<IHttpClient>(IHttpClientToken).to(HttpClient);

container.bind<HttpClient>(HttpClientToken).to(HttpClient);

container.bind<IHttpClientBuilder>(IHttpClientBuilderToken).to(HttpClientBuilder);

container.bind<HttpClientBuilder>(HttpClientBuilderToken).to(HttpClientBuilder);
