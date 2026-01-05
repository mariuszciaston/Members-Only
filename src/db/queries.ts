import * as db from "./pool.js";

const insertUser = async (username: string, hashedPassword: string) => {
  const result = await db.query(
    "INSERT INTO users (username, password) VALUES ($1, $2)",
    [username, hashedPassword],
  );

  return result.rows[0];
};

const getUserByUsername = async (username: string) => {
  const result = await db.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);

  return result.rows[0];
};

const getUserById = async (id: string) => {
  const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);

  return result.rows[0];
};

export { getUserById, getUserByUsername, insertUser };
