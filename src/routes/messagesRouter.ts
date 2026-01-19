import { Router } from "express";

import {
  postDeleteMessage,
  postNewMessage,
  renderNewMessage,
} from "../controllers/messagesController.js";
import { validateMessage } from "../middlewares/validator.js";

const messagesRouter = Router();

messagesRouter.get("/new", renderNewMessage);
messagesRouter.post("/new", validateMessage, postNewMessage);

messagesRouter.post("/delete/:id", postDeleteMessage);

export default messagesRouter;
