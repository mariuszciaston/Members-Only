import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

import { createMessage, deleteMessage } from "../db/queries.js";
import { MessageBody, User } from "../types/types.js";

export const renderNewMessage = (_req: Request, res: Response) => {
  res.render("new-message-form");
};

export const postNewMessage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.render("new-message-form", {
      body: req.body as MessageBody,
      errors: errors.array(),
    });
    return;
  }

  try {
    const { text, title } = req.body as MessageBody;
    const userId = (res.locals.currentUser as User).user_id;

    await createMessage(title, text, userId);
    res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const postDeleteMessage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const messageId = parseInt(req.params.id);
    await deleteMessage(messageId);
    res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
};
