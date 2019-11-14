let express = require('express') 
let bodyParser = require('body-parser')
let mongoose = require('mongoose')
let Project = require('./models/Project')
let Step = require('./models/Step')

const app = express();

const mongoDB = 'mongodb://localhost:27017/test';
mongoose.connect(mongoDB, {useNewUrlParser: true,   useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const getProjects = async (q = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("log 1 :", q, ": Query");
      let projects = await Project.find(q).exec();
      console.log("log 2 :", projects, ": Projects, below first await");
      projects = await Promise.all(
        projects.map(
          proj =>
            new Promise(async (resolve, reject) => {
              try {
                let steps = await Promise.all(
                  proj.steps.map(
                    step =>
                      new Promise(async (resolve, reject) => {
                        try {
                          resolve(Step.findById(step).exec());
                        } catch (e) {
                          reject(e);
                        }
                      })
                  )
                );
                resolve(Object.assign(proj, { steps }));
                console.log("log 3 : ", steps, ": Steps");
              } catch (e) {
                reject(e);
              }
            })
        )
      );
      resolve(projects);
    } catch (e) {
      reject(e);
    }
  });
};
(async () => {
  mongoose.connect(
    mongoDB,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    e => {
      console.log(e);
      getProjects();
    }
  );
})();


app.get('/test', function(req,res){
  res.send('Homepage Test')
})

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


module.exports = app
