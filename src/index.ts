import express from "express";
import session from "express-session";
import path from "node:path";
import passport from "passport";
import { fileURLToPath } from "url";

import "./config/passport.js";
import errorHandler from "./middlewares/errorHandler.js";
import authRouter from "./routes/authRouter.js";
import indexRouter from "./routes/indexRouter.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({ resave: false, saveUninitialized: false, secret: "cats" }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use("/", indexRouter);
app.use("/", authRouter);

app.get("/{*splat}", (_req, res) => {
  res.status(404).render("404");
});

app.use(errorHandler);

app.listen(3000, (error) => {
  if (error) throw error;
  console.log(`Server running at http://localhost:3000/`);
});
