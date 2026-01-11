import { body } from "express-validator";

import { getUserByUsername } from "../db/queries.js";
import { RegisterBody } from "../types/types.js";

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 20 characters.";

export const validateUser = [
  body("fullname")
    .trim()
    .isAlpha("pl-PL", { ignore: " " })
    .withMessage(`Full name ${alphaErr}`)
    .isLength({ max: 20, min: 1 })
    .withMessage(`full name ${lengthErr}`),

  body("username")
    .trim()
    .isAlphanumeric()
    .withMessage("Username must only contain letters and numbers.")
    .isLength({ max: 15, min: 3 })
    .withMessage("Username must be between 3 and 15 characters.")
    .custom(async (value: string) => {
      const user = await getUserByUsername(value);
      return !user;
    })
    .withMessage("Username already in use."),

  body("password")
    .trim()
    .isLength({ max: 20, min: 8 })
    .withMessage("Password must be between 8 and 20 characters.")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter.")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter.")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number.")
    .matches(/[@$!%*?&]/)
    .withMessage(
      "Password must contain at least one special character (@, $, !, %, *, ?, &).",
    ),

  body("passwordConfirmation")
    .custom((value, { req }) => {
      const { password } = req.body as RegisterBody;
      return value === password;
    })
    .withMessage("Password confirmation does not match password."),
];

export const validateMessage = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 50, min: 1 })
    .withMessage(`Title must be between 1 and 50 characters.`),

  body("text")
    .trim()
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ max: 255, min: 2 })
    .withMessage("Message must be between 2 and 255 characters."),
];
