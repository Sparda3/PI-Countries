import axios from "axios";
import style from "./Detail.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPaisById } from "../../Redux/actions";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const countryDetail = useSelector((state) => state.countryDetail);
  const isLoading = useSelector((state) => state.isLoading);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(getPaisById(id));
  }, [dispatch, id]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Hubo un error: {error}</div>;
  }

  return (
    <div className={style.container}>
      <button onClick={() => window.history.back()}>Volver</button>

      <section className={style.card}>
        <img src={countryDetail.flags} alt="flags" />
        <div>
          <h1>{countryDetail.name}</h1>
          <p>ID: {countryDetail.id}</p>
          <p>CAPITAL: {countryDetail.capital}</p>
          <p>POBLACION: {countryDetail.population}</p>
          <p>AREA: {countryDetail.area}</p>
          <p>CONTINENTE: {countryDetail.continents}</p>
          <p>SUB-REGION: {countryDetail.subregion}</p>
          {countryDetail?.Activities?.length !== 0 && (
            <p>
              ACTIVIDADES:{" "}
              {countryDetail?.Activities?.map((Activity) => (
                <li key={Activity.nombre}> {Activity.nombre}</li>
              ))}
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Detail;
