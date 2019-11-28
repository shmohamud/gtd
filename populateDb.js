// Get arguments passed on command line
var userArgs = process.argv.slice(2);
debugger;
console.log("User Args: ", userArgs);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
const async = require("async");
const Project = require("./models/project");
const Action = require("./models/action");

const mongoose = require("mongoose");
const mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const projects = [];
const actions = [];

function projectCreate(title, description, cb) {
  const projectdetail = { title: title, description: description };

  const project = new Project(projectdetail);

  project.save(function(err) {
    if (err) {
      cb(err, null);
      return;
    }
    projects.push(project);
    cb(null, project);
  });
}

function actionCreate(project, text, completed, cb) {
  const actiondetail = { project: project, text: text, completed: completed };

  const action = new Action(actiondetail);

  action.save(function(err) {
    if (err) {
      cb(err, null);
      return;
    }
    actions.push(action);
    cb(null, action);
  });
}

function createProjects(cb) {
  async.series(
    [
      function(callback) {
        projectCreate(
          "Read Eloquent JS",
          "Read and take notes on Ch.7, Asynchronous JS",
          callback
        );
      },
      function(callback) {
        projectCreate(
          "Redux Blog Post",
          "Finish building timer component for braindump feature, in Redux-Tutorial",
          callback
        );
      }
    ],
    // optional callback
    cb
  );
}

function createActions(cb) {
  async.parallel(
    [
      function(callback) {
        actionCreate(
          projects[0],
          "Open Eloquent JS to Chapter 7",
          false,
          callback
        );
      },
      function(callback) {
        actionCreate(projects[0], "Get pen and paper", false, callback);
      },
      function(callback) {
        actionCreate(
          projects[1],
          "Type Medium.com and navigate to draft",
          false,
          callback
        );
      },
      function(callback) {
        actionCreate(
          projects[1],
          "Open gtd-redux-tutorial-blog directory in  VS code",
          false,
          callback
        );
      }
    ],
    cb
  );
}

async.series([createProjects, createActions], function(err, results) {
  if (err) {
    console.log("FINAL ERR: " + err);
  } else {
    console.log("RESULTS: ", results);
  }
  mongoose.connection.close();
});
