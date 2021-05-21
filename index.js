const express = require('express');
const Discord = require('discord.js');
const client = new Discord.Client();
const app = express();
const passport = require("passport");
const { Strategy } = require("passport-discord");
const session = require("express-session");

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((obj, done) => done(null, obj));

const scopes = ["identify", "guilds"];
passport.use(new Strategy({
      clientID: "clientID",
      clientSecret: "secret",
      callbackURL: "callback-url",
      scope: [ "enter your scopes" ],
    },
    (accessToken, refreshToken, profile, done) => {
      process.nextTick(() => done(null, profile));
    })
);

app.get("/login", passport.authenticate("discord", { scope: ["enter your scopes" ], }));
app.get("/callback", passport.authenticate("discord", { failureRedirect: "/error", }), (req, res) => res.redirect("/"));
app.get("/logout", (req, res) => {
  req.logOut();
  return res.redirect("/");
});
