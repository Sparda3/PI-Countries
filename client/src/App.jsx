import { Route, useLocation } from "react-router-dom";
import Home from "./Views/Home/Home";
import Landing from "./Views/Landing/Landing";
import Detail from "./Views/Detail/Detail";
import Form from "./Views/Form/Form";
import NavBar from "./Components/NavBar/NavBar";
import style from "../src/main.module.css";

function App() {
  const location = useLocation();

  async function onSearch(id) {
    const URL = "http://localhost:3001/countries";
    try {
      const { data } = await axios(URL + id);
      setCharacters((oldChars) => [...oldChars, data]);
    } catch (error) {
      window.alert(error.message);
    }
  }

  return (
    <div>
      <Route exact path="/" component={Landing} />

      <Route path="/home" component={Home} />

      <Route path="/detail/:id" component={Detail} />

      <Route path="/create" component={Form} />
    </div>
  );
}

export default App;
