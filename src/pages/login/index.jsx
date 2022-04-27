import { Redirect } from "react-router-dom";
import FormLogin from "../../components/formLogin";

function Login({
  setAutenticathed,
  autenticathed,
  setNameUser,
  setModule,
  setLista,
}) {
  if (autenticathed) {
    return <Redirect to="/home" />;
  }
  return (
    <FormLogin
      setAutenticathed={setAutenticathed}
      setNameUser={setNameUser}
      setModule={setModule}
    />
  );
}
export default Login;
