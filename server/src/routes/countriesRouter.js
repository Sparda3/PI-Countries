const { Router } = require("express");
const {
  getCountriesHandler,
  getCountriesIdHandler,
} = require("../Handlers/CountriesHandlers");

const countriesRouter = Router();

countriesRouter.get("/", getCountriesHandler);

countriesRouter.get("/:id", getCountriesIdHandler);

module.exports = countriesRouter;
