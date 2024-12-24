import { DatabaseConnection, IDBConfig } from "./databaseConnection";

const config: IDBConfig = {
    host: 'localhost',
    port: 5432,
    dbname: 'mydb'
};

const connection1 = DatabaseConnection.getInstance(config);

connection1.connect();

const connection2 = DatabaseConnection.getInstance();

console.log(connection1 === connection2); // true