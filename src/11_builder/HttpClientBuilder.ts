import { injectable } from "inversify";

import { IHttpClient, IHttpClientBuilder } from "./interfaces";

import { HttpClient } from "./HttpClient";

@injectable()
export class HttpClientBuilder implements IHttpClientBuilder {
    private url: string = "http://localhost:3000";
    private method: string = "GET";
    private headers: Record<string, string> = {};
    private body: string = "";
    private timeout: number = 5000;

    setUrl(url: string): IHttpClientBuilder {
        this.url = url;
        return this;
    }

    setMethod(method: string): IHttpClientBuilder {
        this.method = method;
        return this;
    }

    addHeader(key: string, value: string): IHttpClientBuilder {
        this.headers[key] = value;
        return this;
    }

    setHeaders(headers: Record<string, string>): IHttpClientBuilder {
        this.headers = headers;
        return this;
    }

    setBody(body: string): IHttpClientBuilder {
        this.body = body;
        return this;
    }

    setTimeout(timeout: number): IHttpClientBuilder {
        this.timeout = timeout;
        return this;
    }

    build(): IHttpClient {
        const client = new HttpClient(this.url, this.method, this.headers, this.body, this.timeout);

        return client;
    }
}