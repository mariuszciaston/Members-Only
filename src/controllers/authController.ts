import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import passport from "passport";

import { createUser } from "../db/queries.js";
import { RegisterBody } from "../types/types.js";

export const renderRegister = (_req: Request, res: Response) => {
  res.render("register-form");
};

export const renderLogin = (_req: Request, res: Response) => {
  res.render("login-form");
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.render("register-form", {
      body: req.body as RegisterBody,
      errors: errors.array(),
    });
    return;
  }

  try {
    const { fullname, password, username } = req.body as RegisterBody;
    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser(username, hashedPassword, fullname);
    res.redirect("/login");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const login = passport.authenticate("local", {
  failureRedirect: "/",
  successRedirect: "/",
}) as (req: Request, res: Response, next: NextFunction) => void;

export const logout = (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) {
      next(err);
      return;
    }
    res.redirect("/");
  });
};
