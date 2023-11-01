const axios = require("axios");

const importCountries = async () => {
  const response = await axios.get("http://localhost:5000/countries");

  const countriesApi = response.data.map((country) => {
    return {
      id: country.cca3,
      name: country.name.common,
      flags: country.flags.png,
      continents:
        typeof country.continents === "object"
          ? country.continents[0]
          : country.continents,
      capital:
        typeof country.capital === "object"
          ? country.capital[0]
          : country.capital,
      subregion: country.subregion,
      area: country.area,
      population: country.population,
    };
  });

  return countriesApi;
};

module.exports = importCountries;
