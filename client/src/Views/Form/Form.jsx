import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../Components/NavBar/NavBar";
import style from "./Form.module.css";
import { postActivity, getPaises } from "../../Redux/actions";

const Form = () => {
  const dispatch = useDispatch();
  const paises = useSelector((state) => state.paises);
  const [searchTerm, setSearchTerm] = useState("");
  const [form, setForm] = useState({
    nombre: "",
    dificultad: "",
    duracion: "",
    temporada: "",
    paises: [],
  });
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    dispatch(getPaises());
  }, [dispatch]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPaises = paises.filter((pais) =>
    pais.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const changePaises = (e) => {
    const paisId = e.target.value;
    if (paisId && !form.paises.includes(paisId)) {
      setForm((prevForm) => ({
        ...prevForm,
        paises: [...prevForm.paises, paisId],
      }));
    }
    if (form.paises.includes(paisId)) {
      setForm((prevForm) => ({
        ...prevForm,
        paises: form.paises.filter((pais) => pais !== paisId),
      }));
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (JSON.stringify(validate()) === JSON.stringify({})) {
      dispatch(postActivity(form))
        .then(() => {
          setForm({
            nombre: "",
            dificultad: "",
            duracion: "",
            temporada: "",
            paises: [],
          });
          setIsSuccess(true);
          setTimeout(() => {
            setIsSuccess(false);
          }, 4000);
        })
        .catch((error) => {
          console.error("Error al enviar el formulario", error);
        });
    }
  };

  const changeHandler = (e) => {
    const property = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [property]: value });
  };

  const isFormValid = () => {
    return (
      !Object.values(form).some((field) => field === "") &&
      Object.keys(errors).length === 0
    );
  };

  return (
    <div>
      {location.pathname !== "/" && <NavBar />}
      <form className={style.formContainer}>
        {isSuccess && (
          <p style={{ color: "green", textAlign: "center", padding: "50px" }}>
            ¡El post se ha enviado correctamente!
          </p>
        )}
        <div className={style.form}>
          <label>Nombre</label>
          <input
            type="text"
            value={form.nombre}
            onChange={changeHandler}
            name="nombre"
            required
            autoComplete="off"
          />
        </div>

        <div className={style.form}>
          <label>Dificultad</label>
          <input
            type="number"
            placeholder="Dificultad de 1 a 5"
            min="1"
            max="5"
            value={form.dificultad}
            onChange={changeHandler}
            name="dificultad"
          />
        </div>

        <div className={style.form}>
          <label>Duracion</label>
          <input
            type="number"
            placeholder="Duracion hasta 24hs"
            min="1"
            max="24"
            value={form.duracion}
            onChange={changeHandler}
            name="duracion"
          />
        </div>

        <div className={style.form}>
          <label>Temporada</label>
          <select
            type="select"
            value={form.temporada}
            onChange={changeHandler}
            name="temporada"
          >
            <option value="">Seleccione una opción...</option>
            <option value="Verano">Verano</option>
            <option value="Otoño">Otoño</option>
            <option value="Invierno">Invierno</option>
            <option value="Primavera">Primavera</option>
          </select>
        </div>

        <div className={style.form}>
          <label>Paises</label>
          <input
            type="text"
            placeholder="Buscar país"
            value={searchTerm}
            onChange={handleSearch}
          />
          {filteredPaises && filteredPaises.length > 0 ? (
            <select
              multiple={true}
              name="paises"
              type="select"
              value={form.paises}
              onChange={changePaises}
            >
              {filteredPaises.map((pais, index) => (
                <option value={pais.id} key={index}>
                  {pais.name}
                </option>
              ))}
            </select>
          ) : (
            <p>No hay paises</p>
          )}
        </div>

        <button type="submit" onClick={submitHandler} disabled={!isFormValid()}>
          CREAR ACTIVIDAD
        </button>
      </form>
    </div>
  );
};

export default Form;
