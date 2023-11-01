const axios = require("axios");
const { Country } = require("../../db");
const { Activity } = require("../../db");

const getCountryById = async (id) => {
  const country = await Country.findByPk(id, {
    include: {
      model: Activity,
      attributes: ["nombre"],
      through: {
        attributes: [],
      },
    },
  });

  if (country) {
    return country;
  } else {
    throw new error("Country not found");
  }
};

module.exports = {
  getCountryById,
};
