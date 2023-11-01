import { Link } from "react-router-dom";
import style from "./Landing.module.css";

const Landing = () => {
  return (
    <div className={style.div}>
      <div className={style.divLan}>
        <Link className={style.Link} to="/home">
          INGRESAR
        </Link>
      </div>
    </div>
  );
};

export default Landing;
