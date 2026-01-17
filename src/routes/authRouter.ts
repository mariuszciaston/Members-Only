import { Router } from "express";

import {
  login,
  logout,
  register,
  renderLogin,
  renderRegister,
} from "../controllers/authController.js";
import { validateLogin, validateUser } from "../middlewares/validator.js";

const authRouter = Router();

authRouter.get("/register", renderRegister);
authRouter.post("/register", validateUser, register);

authRouter.get("/login", renderLogin);
authRouter.post("/login", validateLogin, login);

authRouter.get("/logout", logout);

export default authRouter;
