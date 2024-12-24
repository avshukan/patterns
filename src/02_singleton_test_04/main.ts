import { DBConnection, IDBConfig } from './dbConnection';

const db1 = DBConnection.getInstance({
    host: 'localhost',
    port: 5432,
    dbname: 'testdb'
});
db1.connect();

const db2 = DBConnection.getInstance();
db2.connect();

console.log(db1 === db2); // true
