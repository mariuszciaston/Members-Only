import { Router } from "express";

import {
  postNewMessage,
  renderNewMessage,
} from "../controllers/messagesController.js";
import { validateMessage } from "../middlewares/validator.js";

const messagesRouter = Router();

messagesRouter.get("/new", renderNewMessage);
messagesRouter.post("/new", validateMessage, postNewMessage);

export default messagesRouter;
