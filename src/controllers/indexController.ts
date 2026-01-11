import { Request, Response } from "express";

import { getAllMessages } from "../db/queries.js";

export const renderHome = async (_req: Request, res: Response) => {
  const allMessages = await getAllMessages();
  res.render("index", { messages: allMessages });
};
