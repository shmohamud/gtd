import project from "../controllers/ProjectController";

export default app => {

  app.route("/projects")
    .get(project.getAllProjects)
    .post(project.createProject);

  app.route("/projects/:projectId")
    .get(project.getProject)
    .put(project.updateProject)
    .delete(project.deleteProject);
};
