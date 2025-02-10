import { IHttpClient } from "./interfaces";

const TIMEOUT_ERROR = "Request timed out";

interface IOptions {
    method: string;
    headers: Record<string, string>;
    body?: string;
}

export class HttpClient implements IHttpClient {
    private url: string = "http://localhost:3000";
    private method: string = "GET";
    private headers: Record<string, string> = {};
    private body: string = "";
    private timeout: number = 5000;

    constructor(url: string, method?: string, headers?: Record<string, string>, body?: string, timeout?: number) {
        this.url = url;
        if (method) {
            this.method = method;
        }
        if (headers) {
            this.headers = headers;
        }
        if (body) {
            this.body = body;
        }
        if (timeout) {
            this.timeout = timeout;
        }
    }

    public async send(): Promise<Response> {
        const options: IOptions = {
            method: this.method,
            headers: this.headers,
        };

        if (this.method === "POST" || this.method === "PUT") {
            options.body = this.body;
        }

        const request = new Promise((resolve, reject) => {
            const timeoutId = setTimeout(() => {
                reject(new Error(TIMEOUT_ERROR));
            }, this.timeout);

            fetch(this.url, options)
                .then(response => {
                    console.log(Object.keys(response));
                    clearTimeout(timeoutId);
                    if (!response.ok) {
                        reject(new Error(`HTTP Error: ${response.status} ${response.statusText}`));
                    }
                    resolve(response);
                })
                .catch(error => {
                    clearTimeout(timeoutId);
                    reject(new Error(`Network error: ${error.message}`));
                });
        });

        const response = await request;

        return response as Response;
    }
}