import "./App.css";
import { Route, Switch } from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/login";
import Home from "./pages/home";
import { useState, useEffect } from "react";
import Api from "./services/api";

function App() {
  const [autenticathed, setAutenticathed] = useState(false);
  const [nameUser, setNameUser] = useState("alysson colombo");
  const [module, setModule] = useState("modulo 1");
  const [lista, setLista] = useState([]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("@kenziehub:token"));
    if (token) {
      return setAutenticathed(true);
    }
  }, [autenticathed]);

  function request() {
    const idUser = sessionStorage.getItem("@id:user");
    Api.get(`users/${idUser}`).then((res) => setLista(res.data.techs));
  }
  useEffect(() => {
    request();
  }, [lista]);

  return (
    <div className="App">
      <header className="App-header">
        <Switch>
          <Route exact path="/home">
            <Home
              setAutenticathed={setAutenticathed}
              autenticathed={autenticathed}
              nameUser={nameUser}
              module={module}
              lista={lista}
              setLista={setLista}
            />
          </Route>

          <Route exact path="/">
            <Login
              autenticathed={autenticathed}
              setAutenticathed={setAutenticathed}
              setNameUser={setNameUser}
              setModule={setModule}
              setLista={setLista}
            />
          </Route>

          <Route exact path="/register">
            <Register autenticathed={autenticathed} />
          </Route>
        </Switch>
      </header>
    </div>
  );
}

export default App;
