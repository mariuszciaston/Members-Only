import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();
import { createMessage, createUser } from "../db/queries.js";

export const content = async () => {
  const USER_PASSWORD = process.env.PASSWORD;
  if (!USER_PASSWORD) throw new Error("USER_PASSWORD is not defined");

  const hashedPassword = await bcrypt.hash(USER_PASSWORD, 10);

  await createUser("Mariusz", hashedPassword, "Mariusz Ciastoń", true, true);

  await createMessage("Hello!", "This is the first test message.", 1);

  await createMessage("Welcome", "Welcome to my Members Only app.", 1);
};
