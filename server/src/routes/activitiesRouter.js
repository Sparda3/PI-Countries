const { Router } = require("express");
const {
  getActivitiesHandler,
  postActivitiesHandler,
} = require("../Handlers/ActivitiesHandlers");

const activitiesRouter = Router();

activitiesRouter.get("/", getActivitiesHandler);

activitiesRouter.post("/", postActivitiesHandler);

module.exports = activitiesRouter;
