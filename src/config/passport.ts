import bcrypt from "bcryptjs";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import type { User } from "../types/types.js";

import { getUserById, getUserByUsername } from "../db/queries.js";

passport.use(
  new LocalStrategy(
    (
      username: string,
      password: string,
      done: (
        error: unknown,
        user?: Express.User | false,
        options?: { message: string },
      ) => void,
    ) => {
      getUserByUsername(username)
        .then((user) => {
          if (!user) {
            done(null, false, { message: "Incorrect username" });
            return;
          }

          return bcrypt.compare(password, user.password).then((match) => {
            if (!match) {
              done(null, false, { message: "Incorrect password" });
              return;
            }

            done(null, user);
          });
        })
        .catch((err: unknown) => {
          done(err);
        });
    },
  ),
);

passport.serializeUser(
  (user: Express.User, done: (err: unknown, id?: number) => void) => {
    done(null, (user as User).user_id);
  },
);

passport.deserializeUser(
  (id: number, done: (err: unknown, user?: Express.User | false) => void) => {
    getUserById(id)
      .then((user) => {
        done(null, user);
      })
      .catch((err: unknown) => {
        done(err);
      });
  },
);
