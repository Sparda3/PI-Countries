const { Country, Activity } = require("../../db");
const { Op } = require("sequelize");

const getCountryByName = async (name) => {
  const country = await Country.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
  });
  if (country.length > 0) {
    console.log(country);
    return country;
  } else {
    throw new error("Country not found");
  }
};

const getAllCountries = async () => {
  const countries = await Country.findAll({
    include: {
      model: Activity,
      attributes: ["nombre", "dificultad", "duracionHoras", "temporada"],
      through: {
        attributes: [],
      },
    },
  });
  return countries;
};

module.exports = {
  getCountryByName,
  getAllCountries,
};
