import { ConfigManager, IConfigInstance } from "./configManager";

const config1: IConfigInstance = ConfigManager.getInstance();

console.log(config1); // undefined

config1.set('apiUrl', 'https://api.example.com');

console.log(config1.get('apiUrl')); // "https://api.example.com"

const config2: IConfigInstance = ConfigManager.getInstance();

console.log(config2.get('apiUrl')); // "https://api.example.com" (тот же экземпляр)

config1.set('host', 'localhost');

config2.set('apiUrl', 'https://new.example.org');

console.log(config1.get('apiUrl')); // "https://new.example.org"

console.log(config2.get('host')); // "localhost"