import { Cache, ICache } from "./cache";

const cache1: ICache = Cache.getInstance();

const cache2: ICache = Cache.getInstance();

cache1.set('apiUrl', 'https://api.example.com');

cache2.set('apiUrl', 'https://api2.example.com');

console.log(cache1.get('apiUrl')); // "https://api2.example.com"

console.log(cache2.get('apiUrl')); // "https://api2.example.com"

cache1.set('host', 'localhost');

console.log(cache2.get('host')); // "localhost"

cache1.clear();

console.log(cache2.get('host')); // undefined