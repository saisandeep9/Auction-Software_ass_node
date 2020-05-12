const mongoose = require("mongoose");
const Joi = require("joi");
const Schema = mongoose.Schema;

const projectSchema = new mongoose.Schema({
  projectTitle: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
    minlength: 5,
    maxlength: 250,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Project = mongoose.model("Project", projectSchema);

function validateProject(project) {
  const schema = {
    projectTitle: Joi.string().trim().min(5).max(50).required(),
    description: Joi.string().trim().min(5).max(255).required(),
    category: Joi.required(),
    user: Joi.required(),
  };

  return Joi.validate(project, schema);
}

exports.Project = Project;
exports.validate = validateProject;
