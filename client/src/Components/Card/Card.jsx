import style from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <div className={style.card}>
      <Link className={style.link} to={`/detail/${props.id}`}>
        <h1> Nombre: {props.name}</h1>
      </Link>
      <img src={props.flags} alt={props.name} />
      <h2> Capital: {props.capital}</h2>
      <h2> Continente: {props.continents}</h2>
    </div>
  );
};

export default Card;
