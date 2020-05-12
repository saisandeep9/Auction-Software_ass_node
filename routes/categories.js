const express = require("express");
const app = express();
const _ = require("lodash");

const { Category } = require("../models/category");

app.post("/", async (req, res) => {
 
  let category = await Category.findOne({
    categoryName: req.body.categoryName,
  });
  if (category) return res.status(400).send("category already registered.");

  category = new Category(_.pick(req.body, ["categoryName"]));

  await category.save();
  res.send(category);
});
module.exports = app;
