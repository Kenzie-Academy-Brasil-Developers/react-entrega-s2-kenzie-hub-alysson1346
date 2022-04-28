import "./style.css";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Api from "../../services/api.js";
import logo from "../../assets/img/Logo.svg";

function FormLogin({ setAutenticathed, setNameUser, setModule, setLista }) {
  const formSchema = yup.object().shape({
    email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
    password: yup.string().min(6, "Minimo de 6"),
  });

  const history = useHistory();

  const logar = (data) => {
    Api.post("/sessions", data)
      .then((res) => {
        const nome = res.data.user.name;
        const modulo = res.data.user.course_module;
        const tech = res.data.user.techs;
        const id = res.data.user.id;
        setLista(tech);
        setNameUser(nome);
        setModule(modulo);
        setAutenticathed(true);
        const token = JSON.stringify(res.data.token);
        localStorage.setItem("@kenziehub:token", token);
        sessionStorage.setItem("@id:user", id);
      })
      .catch((error) => console.log(error));
  };

  const formLogin = (data) => {
    logar(data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  return (
    <div>
      <img className="formLogo" src={logo} />
      <form className="formLogin" onSubmit={handleSubmit(formLogin)}>
        <p>Login</p>
        <label className="formLabel">E-mail</label>
        <input
          className="formInput"
          placeholder="Digite aqui seu email"
          {...register("email")}
        />

        <label className="formLabel">Senha</label>
        <input
          className="formInput"
          type="password"
          placeholder="Digite aqui sua senha"
          {...register("password")}
        />
        <button className="formBtnLogin" type="submit">
          Entrar
        </button>

        <p className="conta">Ainda não possui uma conta?</p>

        <button className="formBtnCadastro">
          <Link to="register">cadastre-se</Link>
        </button>
      </form>
    </div>
  );
}
export default FormLogin;
