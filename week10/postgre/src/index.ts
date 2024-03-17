require('dotenv').config();
const { Client } = require('pg');

const createTable = async () => {
    const client = new Client({
        connectionString: process.env.URL
    });

    try {
        await client.connect();
        const result = await client.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `)
        console.log(result);
        console.log('created the table')
    }
    catch (err) {
        throw new Error("Error occured");
    }
    finally {
        await client.end();
    }
}

const insertData = async (username:string, email:string, password:string) => {
    const client = new Client({
        connectionString: process.env.URL
    });

    try {
        await client.connect();
        const inserQuery = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
        const values = [username, email, password];
        const res = await client.query(inserQuery, values);
        console.log('Inserted Successfully');
        console.log(res);
    }
    catch (err) {
        throw new Error("Error occured");
    }
    finally {
        await client.end();
    }
}

const getUsers = async (email:string) => {
    const client = new Client({
        connectionString: process.env.URL
    });

    try {
        await client.connect();
        const getQuery = "SELECT * FROM users WHERE email = $1";
        const values = [email]
        const res = await client.query(getQuery, values);
        if(res.rows.length > 0) {
            console.log(res.rows[0]);
            return res.rows[0];
        }
        else{
            console.log('Could not find the user with the email id');
        }
    }
    catch (err) {
        throw new Error("Error occured");
    }
    finally {
        await client.end();
    }
}

//createTable();
//insertData('username3', 'user3@example.com', 'user_password');
getUsers('user3@example.com');
