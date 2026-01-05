import { Router } from "express";

import { renderHome } from "../controllers/indexController.js";

const indexRouter = Router();

indexRouter.get("/", renderHome);

export default indexRouter;
