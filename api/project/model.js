const db = require("../../data/dbConfig.js");

async function findAll() {
  const projects = await db("projects");
  return projects;
}

async function postProject(project) {
  const [project_id] = await db("projects").insert(project);
  const [newProject] = await getByID(project_id);
  (await newProject.project_completed) === 0
    ? (newProject.project_completed = false)
    : (newProject.project_completed = true);
  return await newProject;
}

async function getByID(project_id) {
  const project = await db("projects").where("project_id", project_id);
  if (project) {
    return project;
  }
}

module.exports = { findAll, postProject };
