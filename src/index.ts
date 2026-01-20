import connectPgSimple from "connect-pg-simple";
import express from "express";
import session from "express-session";
import path from "node:path";
import passport from "passport";

import "./config/passport.js";
import { fileURLToPath } from "url";

import errorHandler from "./middlewares/errorHandler.js";
import authRouter from "./routes/authRouter.js";
import indexRouter from "./routes/indexRouter.js";
import membershipRouter from "./routes/membershipRouter.js";
import messagesRouter from "./routes/messagesRouter.js";

const pgSession = connectPgSimple(session);
import { pool } from "./db/pool.js";

const app = express();

// EJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Session setup
const sessionStore = new pgSession({
  pool,
  tableName: "session",
});

const SESSION_SECRET = process.env.SECRET;
if (!SESSION_SECRET) throw new Error("SESSION_SECRET is not defined");

app.use(
  session({
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30, // Equals 30 days
    },
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    store: sessionStore,
  }),
);

// Passport Authentication
app.use(passport.session());

app.use((req, _res, next) => {
  console.log(req.session);
  console.log(req.user);
  next();
});

// Parse body
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// Make currentUser available in all templates
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// Routes
app.use("/", indexRouter);
app.use("/", authRouter);
app.use("/messages", messagesRouter);
app.use("/membership", membershipRouter);

app.get("/{*splat}", (_req, res) => {
  res.status(404).render("404");
});

app.use(errorHandler);

const PORT = process.env.PORT ?? "3000";

app.listen(PORT, (error) => {
  if (error) throw error;
  console.log(`Server running at http://localhost:${PORT}/`);
});
