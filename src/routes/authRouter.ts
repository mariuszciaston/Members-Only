import { Router } from "express";

import {
  login,
  logout,
  renderLogin,
  renderRegister,
  register,
} from "../controllers/authController.js";

const authRouter = Router();

authRouter.get("/register", renderRegister);
authRouter.post("/register", register);

authRouter.get("/login", renderLogin);
authRouter.post("/login", login);
authRouter.get("/logout", logout);

export default authRouter;
