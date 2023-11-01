import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../Card/Card";
import style from "./CardsContainer.module.css";

const CardsContainer = () => {
  const paises = useSelector((state) => state.paises);
  const [currentPage, setCurrentPage] = useState(0);

  let nextPage = () => {
    if (paises.length <= currentPage + 10) {
      setCurrentPage(currentPage);
    } else setCurrentPage(currentPage + 10);
  };

  let prevPage = () => {
    if (currentPage < 10) {
      setCurrentPage(0);
    } else {
      setCurrentPage(currentPage - 10);
    }
  };

  const firstPage = () => {
    setCurrentPage(0);
  };

  const lastPage = () => {
    setCurrentPage(Math.floor(paises.length / 10) * 10);
  };

  const slicedPaises = paises.slice(currentPage, currentPage + 10);

  return (
    <div>
      <div className={style.buttonContainer}>
        <button onClick={firstPage} className={style.butn}>
          {"<<"}
        </button>
        <button onClick={prevPage} className={style.butn}>
          {"<"}
        </button>
        <button onClick={nextPage} className={style.butn}>
          {">"}
        </button>
        <button onClick={lastPage} className={style.butn}>
          {">>"}
        </button>
      </div>
      <div className={style.container}>
        {slicedPaises.map((pais) => {
          return (
            <Card
              key={pais.id}
              id={pais.id}
              name={pais.name}
              flags={pais.flags}
              continents={pais.continents}
              capital={pais.capital}
              subregion={pais.subregion}
              population={pais.population}
              area={pais.area}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CardsContainer;
