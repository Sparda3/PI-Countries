const { Country } = require("./src/db.js");
const importCountries = require("./src/Controller/importPais");
const server = require("./src/server");
const { conn } = require("./src/db.js");
const PORT = 3001;

conn
  .sync({ force: true })
  .then(async () => {
    try {
      const countriesData = await importCountries();
      await Country.bulkCreate(countriesData);
    } catch (error) {
      console.log(error);
    }

    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));
