import { Router } from "express";

import {
  postResult,
  renderMembership,
} from "../controllers/membershipController.js";
import { validateResult } from "../middlewares/validator.js";

const membershipRouter = Router();

membershipRouter.get("/", renderMembership);
membershipRouter.post("/", validateResult, postResult);

export default membershipRouter;
