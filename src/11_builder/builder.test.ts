import { HttpClientBuilder } from "./HttpClientBuilder";

describe('builder', () => {

    const builder = new HttpClientBuilder();

    const url = 'http://www.google.com/';

    global.fetch = jest.fn(() => Promise.resolve({
        ok: true,
        status: 200,
        statusText: 'OK',
        url: url
    })) as jest.Mock;

    test('url setting', async () => {
        const client = builder.setUrl(url).build();

        const response = await client.send();

        const status = response.status;

        expect(status).toBe(200);

        const realUrl = response.url;

        expect(realUrl).toBe(url);
    });
});