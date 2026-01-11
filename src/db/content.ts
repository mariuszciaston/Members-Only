import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();
import { createMessage, createUser } from "../db/queries.js";

export const content = async () => {
  const USER_PASSWORD = process.env.PASSWORD;
  if (!USER_PASSWORD) throw new Error("USER_PASSWORD is not defined");

  const hashedPassword = await bcrypt.hash(USER_PASSWORD, 10);

  await createUser("Mariusz", hashedPassword, "Mariusz Ciastoń", true, true);

  await createUser("John", hashedPassword, "John C", false, true);

  await createUser("Charlotte", hashedPassword, "Charlotte E", false, false);

  await createMessage("Hello!", "This is the first test message.", 1);

  await createMessage("Welcome", "Welcome to my Members Only app.", 1);

  await createMessage("Nice!", "Keep up the good work.", 2);

  await createMessage(
    "Lorem ipsum",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor..",
    3,
  );
};
