const express = require("express");
const app = express();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User, validate } = require("../models/user");

// app.get("/me", async (req, res) => {
//   const user = await User.findOne(req.user.email).select("-password");
//   res.send(user);
// });

app.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(9);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  res.send(user);
});
module.exports = app;
