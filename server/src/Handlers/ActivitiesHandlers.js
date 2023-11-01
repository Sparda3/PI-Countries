const { postActivity } = require("../Controller/Activities/activitiesPost");
const { getAllActivities } = require("../Controller/Activities/getActivities");

const getActivitiesHandler = async (req, res) => {
  try {
    const activities = await getAllActivities();
    res.status(200).json(activities);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const postActivitiesHandler = async (req, res) => {
  try {
    const { nombre, dificultad, duracionHoras, temporada, paises } = req.body;
    const newActivity = await postActivity(
      nombre,
      dificultad,
      duracionHoras,
      temporada,
      paises
    );
    res.status(201).json("Actividad creada con exito");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getActivitiesHandler,
  postActivitiesHandler,
};
