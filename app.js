const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const Project = require("./models/Project");
const Action = require("./models/Action");

const app = express();

console.log(process.env.MONGO_ATLAS_PW)

const mongoDB = `mongodb+srv://smohamud:${process.env.MONGO_ATLAS_PW}@cluster0-kuuup.mongodb.net/gtd?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const action = async function() {
  var data = await Action.findOne({ completed: false })
    .populate("project")
    .exec();
};

action();


app.use("/", routes);

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(400).send(`Error: ${res.originUrl} not found`);
  next();
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send(`Error: ${err}`);
  next();
});

module.exports = app;
