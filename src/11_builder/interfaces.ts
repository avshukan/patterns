export interface IHttpClient {
    send(): Promise<Response>;
}

export interface IHttpClientBuilder {
    setUrl(url: string): IHttpClientBuilder;
    setMethod(method: string): IHttpClientBuilder;
    addHeader(key: string, value: string): IHttpClientBuilder;
    setHeaders(headers: Record<string, string>): IHttpClientBuilder;
    setBody(body: string): IHttpClientBuilder;
    setTimeout(timeout: number): IHttpClientBuilder;
    build(): IHttpClient;
}
