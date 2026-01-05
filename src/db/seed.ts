#!/usr/bin/env node

import dotenv from "dotenv";
import { Client } from "pg";

dotenv.config();

const SQL = `CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(255),
  password VARCHAR(255)
  );
`;

await (async () => {
  console.log("Connecting...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  console.log("Creating table...");
  await client.query(SQL);
  await client.end();
  console.log("Done!");
})();
