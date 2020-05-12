const express = require("express");
const app = express();
const Joi = require("joi");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");

app.post("/auth", async (req, res) => {
  const result = validate(req.body);
  if (result.error) return res.send(result.error.details[0].message);

  let user = await User.findOne({
    email: req.body.email,
  });
  if (!user) return res.status(400).send("Invalid email or password");

  //Hash the password
  const ispasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!ispasswordValid)
    return res.status(400).send("Invalid password. please try again");

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send(user);

  function validate(req) {
    const schema = {
      email: Joi.string().min(5).max(50).required(),
      password: Joi.string().min(5).max(350).required(),
    };
    return Joi.validate(req, schema);
  }
});
module.exports = app;
