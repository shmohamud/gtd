import Step from './Step';
import Project from './Project';
import mongoose from 'mongoose';

//experiment w populating project steps

const step1 = new Step({
    _id: new mongoose.Types.ObjectId(),
    text: 'This is a step text prop',
    completed: false
  }, function(err, step){
    if(err) return new Error(err)
  });

Project.create({
      _id: new mongoose.Types.ObjectId(),
      title:"Meditation",
      description: "Test Description   ........    Deep Breath    ....",
      steps: []
  }, function(err, project){
    if(err) return new Error(err)
  });

Project.
  findOne({ title: 'Meditation' }).
  populate('steps').
  exec(function (err, project) {
    if (err) return new Error(err);
    console.log('Before push steps %s :', project.steps);
    project.steps.push(step1)
    console.log('After push steps %s :', project.steps)
  });






