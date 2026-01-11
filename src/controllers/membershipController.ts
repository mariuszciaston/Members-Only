import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

import { addMembershipStatus } from "../db/queries.js";
import { ResultBody, User } from "../types/types.js";

export const renderMembership = (_req: Request, res: Response) => {
  res.render("membership-form");
};

export const postResult = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.render("membership-form", {
      body: req.body as ResultBody,
      errors: errors.array(),
    });
    return;
  }

  try {
    const userId = (res.locals.currentUser as User).user_id;
    await addMembershipStatus(userId);
    res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
};
