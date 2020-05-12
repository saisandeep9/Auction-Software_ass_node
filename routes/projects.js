const express = require("express");
const app = express();
const _ = require("lodash");
const { Project, validate } = require("../models/project");
const { Category } = require("../models/category");
const { User } = require("../models/user");

app.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.body.user);
  if (!user) return res.status(400).send("Invalid user.");

  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send("Invalid category.");

  project = new Project(
    _.pick(req.body, ["projectTitle", "description", "category", "user"])
  );
  await project.save();
  res.send(project);
});

app.get("/", async (req, res) => {
  const project = await Project.find().populate(
    "user category",
    "name categoryName -_id"
  );
  res.send(project);
});

module.exports = app;
