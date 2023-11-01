const { Activity } = require("../../db");
const { Country } = require("../../db");

const postActivity = async (
  nombre,
  dificultad,
  duracionHoras,
  temporada,
  country
) => {
  const newActivity = await Activity.create({
    nombre,
    dificultad,
    duracionHoras,
    temporada,
  });
  newActivity.addCountry(country);
  return newActivity;
};

module.exports = {
  postActivity,
};
