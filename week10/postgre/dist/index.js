"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
require('dotenv').config();
const { Client } = require('pg');
const createTable = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = new Client({
        connectionString: process.env.URL
    });
    try {
        yield client.connect();
        const result = yield client.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log(result);
        console.log('created the table');
    }
    catch (err) {
        throw new Error("Error occured");
    }
    finally {
        yield client.end();
    }
});
const insertData = (username, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const client = new Client({
        connectionString: process.env.URL
    });
    try {
        yield client.connect();
        const inserQuery = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
        const values = [username, email, password];
        const res = yield client.query(inserQuery, values);
        console.log('Inserted Successfully');
        console.log(res);
    }
    catch (err) {
        throw new Error("Error occured");
    }
    finally {
        yield client.end();
    }
});
const getUsers = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const client = new Client({
        connectionString: process.env.URL
    });
    try {
        yield client.connect();
        const getQuery = "SELECT * FROM users WHERE email = $1";
        const values = [email];
        const res = yield client.query(getQuery, values);
        if (res.rows.length > 0) {
            console.log(res.rows[0]);
            return res.rows[0];
        }
        else {
            console.log('Could not find the user with the email id');
        }
    }
    catch (err) {
        throw new Error("Error occured");
    }
    finally {
        yield client.end();
    }
});
//createTable();
//insertData('username3', 'user3@example.com', 'user_password');
getUsers('user3@example.com');
