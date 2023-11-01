const { Activity } = require("../../db");
const { Country } = require("../../db");

const getAllActivities = async () => {
  return await Activity.findAll({
    include: {
      model: Country,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

module.exports = {
  getAllActivities,
};
