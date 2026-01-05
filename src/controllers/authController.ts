import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import passport from "passport";

import { insertUser } from "../db/queries.js";
import { RegisterRequestBody } from "../types/types.js";

const renderRegister = (_req: Request, res: Response) => {
  res.render("register-form");
};

const renderLogin = (_req: Request, res: Response) => {
  res.render("login-form");
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password, username } = req.body as RegisterRequestBody;
    const hashedPassword = await bcrypt.hash(password, 10);
    await insertUser(username, hashedPassword);
    res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const login = passport.authenticate("local", {
  failureRedirect: "/",
  successRedirect: "/",
}) as (req: Request, res: Response, next: NextFunction) => void;

const logout = (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) {
      next(err);
      return;
    }
    res.redirect("/");
  });
};

export { login, logout, register, renderLogin, renderRegister };
