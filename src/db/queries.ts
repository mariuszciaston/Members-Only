import * as db from "./pool.js";

export const createUser = async (
  username: string,
  hashedPassword: string,
  fullname: string,
) => {
  const result = await db.query(
    "INSERT INTO users (fullname, username, password) VALUES ($1, $2, $3)",
    [fullname, username, hashedPassword],
  );

  return result.rows[0];
};

export const getUserByUsername = async (username: string) => {
  const result = await db.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);

  return result.rows[0];
};

export const getUserById = async (id: string) => {
  const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);

  return result.rows[0];
};
