import { Redirect } from "react-router-dom";
import FormRegister from "../../components/formRegister";

function Register({ autenticathed }) {
  if (autenticathed) {
    return <Redirect to="/home" />;
  }
  return <FormRegister />;
}
export default Register;
