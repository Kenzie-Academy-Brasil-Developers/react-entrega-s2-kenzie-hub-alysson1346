import { Redirect } from "react-router-dom";
import Dashboard from "../../components/dashboard";

function Home({
  setAutenticathed,
  autenticathed,
  nameUser,
  module,
  lista,
  setLista,
}) {
  if (autenticathed === false || autenticathed === undefined) {
    return <Redirect to="/" />;
  }
  return (
    <Dashboard
      setAutenticathed={setAutenticathed}
      nameUser={nameUser}
      module={module}
      lista={lista}
      setLista={setLista}
    />
  );
}
export default Home;
