#!/usr/bin/env node

import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { Client } from "pg";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sessionSQL = fs.readFileSync(
  path.join(__dirname, "session.sql"),
  "utf-8",
);
const usersSQL = fs.readFileSync(path.join(__dirname, "users.sql"), "utf-8");

console.log("Connecting...");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

await client.connect();
console.log("Creating tables...");

await client.query(usersSQL);
await client.query(sessionSQL);

await client.end();
console.log("Done!");
