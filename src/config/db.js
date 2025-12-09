import mysql from "mysql2/promise";

export const db = mysql.createPool({
    host: "10.106.75.8",
    user: "root",
    password: "root",
    database: "dblivraria",
    port: 3306,
});

console.log("✅Conectado ao BD MySQL");