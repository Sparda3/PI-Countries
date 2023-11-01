const { getCountryById } = require("../Controller/Countries/getCountryById");
const {
  getCountryByName,
  getAllCountries,
} = require("../Controller/Countries/getCountry");

const getCountriesHandler = async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const country = await getCountryByName(name);
      res.status(200).json(country);
    } else {
      const countries = await getAllCountries();
      res.status(200).json(countries);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCountriesIdHandler = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const country = await getCountryById(id);
    res.status(200).json(country);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getCountriesHandler,
  getCountriesIdHandler,
};
