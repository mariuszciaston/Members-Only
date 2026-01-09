import { Router } from "express";

import {
  login,
  logout,
  register,
  renderLogin,
  renderRegister,
} from "../controllers/authController.js";
import { validateUser } from "../middlewares/validator.js";

const authRouter = Router();

authRouter.get("/register", renderRegister);
authRouter.post("/register", validateUser, register);

authRouter.get("/login", renderLogin);
authRouter.post("/login", login);
authRouter.get("/logout", logout);

export default authRouter;
