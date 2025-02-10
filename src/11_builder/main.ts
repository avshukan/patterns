import { container } from "./diConfig";

import { IHttpClientBuilderToken } from "./diTokens";

import { IHttpClientBuilder } from "./interfaces";

const builder = container.get(IHttpClientBuilderToken) as IHttpClientBuilder;

const googleClient = builder
    .setUrl("http://google.com")
    .addHeader('Content-Type', 'application/json')
    .setTimeout(40000)
    .build();

googleClient.send().then(console.log).catch(console.error);

const yandexClient = builder
    .setUrl("http://yandex.ru")
    .setMethod("POST")
    .setBody("Hello, Yandex!")
    .addHeader('Content-Type', 'text/plain')
    .build();

yandexClient.send().then(console.log).catch(console.error);