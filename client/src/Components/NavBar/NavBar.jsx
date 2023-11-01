import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
// import SearchBar from "../SearchBar/SearchBar";

const NavBar = ({ handleSubmit, handleChange }) => {
  return (
    <nav className={style.navContainer}>
      <div className={style.linkContainer}>
        <Link className={style.link} to="/home">
          PAISES
        </Link>
        <Link className={style.link} to="/create">
          CREAR ACTIVIDAD
        </Link>
      </div>

      <form onChange={handleChange}>
        <input type="search" />
        <button type="submit" onClick={handleSubmit}>
          Search
        </button>
      </form>
    </nav>
  );
};

export default NavBar;
