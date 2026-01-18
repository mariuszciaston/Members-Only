import { CreateMessageParams, CreateUserParams, User } from "../types/types.js";
import * as db from "./pool.js";

export const createUser = async ({
  admin,
  fullname,
  hashedPassword,
  membership,
  username,
}: CreateUserParams) => {
  const result = await db.query(
    "INSERT INTO users (fullname, username, password, admin, membership) VALUES ($1, $2, $3, $4, $5)",
    [fullname, username, hashedPassword, admin, membership],
  );

  return result.rows[0];
};

export const getUserByUsername = async (
  username: string,
): Promise<undefined | User> => {
  const result = await db.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);

  return result.rows[0] as User;
};

export const getUserById = async (id: number): Promise<undefined | User> => {
  const result = await db.query("SELECT * FROM users WHERE user_id = $1", [id]);

  return result.rows[0] as User;
};

export const createMessage = async ({
  text,
  title,
  userId,
}: CreateMessageParams) => {
  const { rows } = await db.query(
    "INSERT INTO messages (title, text) VALUES ($1, $2) RETURNING message_id",
    [title, text],
  );

  const messageId = rows[0].message_id as number;

  const result = await db.query(
    "INSERT INTO user_messages (user_id, message_id) VALUES ($1, $2)",
    [userId, messageId],
  );

  return result.rows[0];
};

export const getAllMessages = async () => {
  const result = await db.query(`
  SELECT messages.*, users.fullname AS fullname, users.username AS username, users.admin, users.membership
    FROM messages
    JOIN user_messages
      ON messages.message_id = user_messages.message_id
    JOIN users
      ON user_messages.user_id = users.user_id
   ORDER BY messages.created_at DESC
   `);
  return result.rows;
};

export const addMembershipStatus = async (userId: number) => {
  const result = await db.query(
    "UPDATE users SET membership = true WHERE user_id = $1",
    [userId],
  );

  return result.rows[0];
};
