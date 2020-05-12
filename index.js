const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("config");

const error = require("./middleware/error");
require("express-async-errors");

app.use(express.json());
const corsOptions = {
  exposedHeaders: "x-auth-token",
};
app.use(cors(corsOptions));

//mongodb connection
mongoose
  .connect(config.get("db.host"))
  .then(console.log("`Successfully connected to mongodb host"))
  .catch((err) => console.log("faile to connect to db...", err));

//require routes
const users = require("./routes/users");
const categories = require("./routes/categories");
const projects = require("./routes/projects");
const auth = require("./routes/auth");

//configuration the files
app.use("/api/users", users);
app.use("/api/categories", categories);
app.use("/api/projects", projects);
app.use("/api", auth);
// app.use(error);

const port = process.env.PORT || 3900;
const server = app.listen(port, () => console.log(`listening to port ${port}`));

module.exports = server;
