import mongoose from "mongoose";
import project from "../models/Project";

exports.getProject = (req, res) => {
  project.findById(req.params.projectId, (err, project) => {
    if (err) {
      res.send(err);
    }
    res.json(project);
  });
};

exports.getAllProjects = (req, res) => {
  project.find({}, (err, projects) => {
    if (err) {
      res.send(err);
    }
    res.json(projects);
  });
};

exports.createProject = (req, res) => {
  const newProject = new project(req.body);
  newProject.save((err, project) => {
    if (err) {
      res.send(err);
    }

    res.json(project);
  });
};

exports.updateProject = (req, res) => {
  project.findOneAndUpdate(
    {
      _id: req.params.projectId
    },
    req.body,
    (err, project) => {
      if (err) {
        res.send(err);
      }
      res.json(project);
    }
  );
};

exports.deleteProject = (req, res) => {
  project.remove({ _id: req.params.projectId }, err => {
    if (err) {
      res.send(err);
    }
    res.json({
      message: `${req.params.title} sucessfully deleted`
    })
  })}
