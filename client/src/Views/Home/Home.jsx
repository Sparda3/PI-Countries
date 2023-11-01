import CardsContainer from "../../Components/CardsContainer/CardsContainer";
import NavBar from "../../Components/NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import style from "./Home.module.css";
import {
  getPaises,
  getName,
  sortContinent,
  sortActivity,
  getActivities,
  resetFilters,
  orderAsc,
  orderDesc,
  populationAsc,
  populationDesc,
} from "../../Redux/actions";

const Home = () => {
  const dispatch = useDispatch();
  const paises = useSelector((state) => state.paises);
  const activities = useSelector((state) => state.activities);
  const [searchString, setSearchString] = useState("");

  console.log(activities);

  useEffect(() => {
    dispatch(getPaises());
    dispatch(getActivities());
  }, [dispatch]);

  function handleChange(e) {
    e.preventDefault();
    setSearchString(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getName(searchString));
  }

  function handleReset() {
    dispatch(resetFilters());
  }

  const handleAlphabeticOrder = (e) => {
    if (e.target.value === "asc") {
      dispatch(orderAsc());
    } else if (e.target.value === "desc") {
      dispatch(orderDesc());
    }
  };

  const handleSortByPopulation = (e) => {
    const sortType = e.target.value;
    // Lógica para ordenar por población
    if (sortType === "pop_asc") {
      dispatch({ type: "POPULATION_ASC" });
    } else if (sortType === "pop_desc") {
      dispatch({ type: "POPULATION_DESC" });
    }
  };
  const handleSelectContinent = (e) => {
    const selectedContinent = e.target.value;
    dispatch(sortContinent(selectedContinent));
  };

  function handleFilterByActivity(e) {
    e.preventDefault();
    dispatch(sortActivity(e.target.value));
  }

  return (
    <div className={style.divContainer}>
      {location.pathname !== "/" && (
        <NavBar handleChange={handleChange} handleSubmit={handleSubmit} />
      )}

      <nav className={style.navContainer}>
        <select onChange={handleAlphabeticOrder}>
          <option value="">Ordenar alfabéticamente por:</option>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>

        <select onChange={handleSortByPopulation}>
          <option value="">Ordenar por población:</option>
          <option value="pop_asc">Ascendente</option>
          <option value="pop_desc">Descendente</option>
        </select>

        <select onChange={handleSelectContinent}>
          <option value="">Filtrar por continente:</option>
          <option value="Africa">África</option>
          <option value="South America">Sur América</option>
          <option value="North America">Norte América</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europa</option>
          <option value="Oceania">Oceanía</option>
        </select>

        <select onChange={handleFilterByActivity}>
          <option value="none">Filtrar por Actividad</option>
          {activities.map((activity, index) => (
            <option key={index} value={activity.nombre}>
              {activity.nombre}
            </option>
          ))}
        </select>
        <button onClick={handleReset}>Reset</button>
      </nav>

      <hr></hr>

      <CardsContainer paises={paises} />
    </div>
  );
};

export default Home;
